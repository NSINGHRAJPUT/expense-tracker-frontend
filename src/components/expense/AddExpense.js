import axios from "axios";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { expenseSliceActions } from "../../redux/expense";
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Here is your toast.');

const AddExpense = ({ token, userId }) => {
    const name = useRef()
    const price = useRef();
    const category = useRef();
    const dispatch = useDispatch();

    /////////////////////                ADDING EXPENSES                     //////////////////////
    //                                                                                           //
    //                                                                                           //   
    ///////////////////////////////////////////////////////////////////////////////////////////////
    const expenseHandler = async (e) => {
        try {
            e.preventDefault();
            let expenseObj = {
                name: name.current.value,
                price: price.current.value,
                category: category.current.value,
                userId: userId
            }
            await axios.post('http://localhost:3000/expense/create-expense', expenseObj)
            name.current.value = '';
            price.current.value = '';
            category.current.value = ''
            notify()
            const res = await axios.get("http://localhost:3000/expense/get-expense", { headers: { 'authorization': token } })
            dispatch(expenseSliceActions.fetchExpense(res.data))
        }
        catch (err) {
            console.log(err)
        }
    }
    return <form className='expense-form' onSubmit={expenseHandler}>
        <label >Expense Name</label>
        <input type='text' ref={name}></input>
        <label >Expense Price</label>
        <input type='number' ref={price}></input>
        <label >Expense category</label>
        <input type='text' ref={category}></input>
        <button type='submit'>Add Expense</button>
        <Toaster position="top-right" reverseOrder={false} />
    </form>
}

export default AddExpense;