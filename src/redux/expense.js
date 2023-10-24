import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name: 'Expense',
    initialState: {
        data: []
    },
    reducers: {
        fetchExpense(state, action) {
            state.data = action.payload
        }
    }
})

export const expenseSliceActions = expenseSlice.actions;

export default expenseSlice;