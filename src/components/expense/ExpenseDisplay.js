import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expenseSliceActions } from "../../redux/expense";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useRef, useState } from "react";

const notify = () => toast.error('Item Deleted');

const ExpenseDisplay = ({ token }) => {
    const limit = useRef();
    const [pagination, setpagination] = useState(3);
    const [dataDisplay, setDataDisplay] = useState([]);
    const [pagelimit, setpagelimit] = useState(0);
    const data = useSelector(state => state.expense.data);
    const length = data.length;
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            setDataDisplay(data.slice(pagelimit * pagination, pagination * (pagelimit + 1)))
        }
    }, [data, pagination, pagelimit])

    // /////////////////////               DELETING EXPENSES                  ////////////////////////
    // //                                                                                           //
    // //                                                                                           //   
    // ///////////////////////////////////////////////////////////////////////////////////////////////
    const deleteExpenseHandler = async (e) => {
        try {
            e.preventDefault();
            let expenseId = e.target.value
            await axios.delete('http://localhost:3000/expense/delete-expense', { headers: { id: expenseId } })
            const res = await axios.get("http://localhost:3000/expense/get-expense", { headers: { 'authorization': token } })
            notify();
            dispatch(expenseSliceActions.fetchExpense(res.data))
        }
        catch (err) { console.log(err) }
    }

    return <div className="data-container">
        <div>
            <select ref={limit} onClick={(e) => setpagination(e.target.value)}>
                <option>3</option>
                <option>5</option>
                <option>10</option>
            </select>
        </div>
        <table data-aos="fade-right" data-aos-offset="400" data-aos-easing="ease-in-sine" data-aos-duration="1900">
            <tbody>
                <tr>
                    <th>Time</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th></th>
                </tr>
                {dataDisplay.map((expense) => {
                    return <tr key={expense.id}>
                        <td><div>
                            <span>{expense.createdAt.slice(0, 10)}</span><br></br>
                            <span>{expense.createdAt.slice(11, 19)}</span>
                        </div></td>
                        <td >{expense.name}</td>
                        <td> {expense.price} </td>
                        <td>{expense.category}</td>
                        <td>  <button onClick={deleteExpenseHandler} value={[expense.userId, expense.price, expense.id]}>X</button>
                            <Toaster />
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
        <div>
            {pagelimit !== 0 ? <button onClick={() => setpagelimit(pagelimit - 1)}>{'<'}</button> : ''}
            {(pagelimit + 1) * pagination < length ? <button onClick={() => setpagelimit(pagelimit + 1)}>{'>'}</button> : ''}
        </div>
    </div>
}

export default ExpenseDisplay;