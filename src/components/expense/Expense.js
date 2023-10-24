import { useEffect, useState } from 'react';
import './Expense.css';
import axios from 'axios';
import { useLocation } from 'react-router';
import ExpenseDisplay from './ExpenseDisplay';
import AddExpense from './AddExpense';
import { useDispatch } from 'react-redux';
import { expenseSliceActions } from '../../redux/expense';
import Header from '../header/Header';


const Expense = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [premium, setPremium] = useState(location.state.isPremium);
    const [report, setReport] = useState(false);
    const [reportdata, setreportdata] = useState([]);
    const token = location.state.token;
    const userId = location.state.id;

    useEffect(() => {
        fetchingExpense();
    })

    const fetchingExpense = async () => {
        try {
            const response = await axios.get("http://localhost:3000/expense/get-expense", { headers: { 'authorization': token } })
            dispatch(expenseSliceActions.fetchExpense(response.data))

            const res = await axios.get('http://localhost:3000/user/get-users', { headers: { 'id': userId } })
            res.data.isPremium ? setPremium(true) : setPremium(false);
        }
        catch (err) {
            console.log(err)
        }
    }
    /////////////////////               Report Generation                  ////////////////////////
    //                                                                                           //
    //                                                                                           //   
    ///////////////////////////////////////////////////////////////////////////////////////////////               
    const reportHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:3000/expense/download-expense', { headers: { 'id': userId } })
            console.log(response)
        }
        catch (err) {
            console.log(err)
        }
    }
    const prereportHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:3000/expense/pre-expense', { headers: { 'id': userId } })
            setreportdata((pre) => [...response.data])
            setReport(!report)
        }
        catch (err) {
            console.log(err)
        }
    }
    return <div className={premium ? 'expense dark' : 'expense'} data-aos="fade-left" data-aos-offset="400" data-aos-easing="ease-in-sine" data-aos-duration="900">
        <div className='expense-container' data-aos="fade-right" data-aos-offset="400" data-aos-easing="ease-in-sine" data-aos-duration="1900">
            <Header token={token} premium={premium} premiumHandler={prereportHandler} />
            <section className='expense-section' data-aos="fade-right" data-aos-offset="400" data-aos-easing="ease-in-sine" data-aos-duration="1900">
                <AddExpense token={token} userId={location.state.id} />
            </section>
            <h2 className='spaceX'>Expenses</h2>
            <ExpenseDisplay token={token} />
            {premium && <div className='premiumbtn'><button onClick={reportHandler}>Download Expenses</button></div>}
            {premium && <div className='premiumbtn'><button onClick={prereportHandler}>Previously Downloaded Expenses</button></div>}
            {report && <ul>
                {reportdata.map((predata) => {
                    return <li key={predata.id}><a href={predata.location} target='_blank' rel='noreferrer'>download{predata.id}</a></li>
                })}
            </ul>}
        </div>
    </div>
}

export default Expense;