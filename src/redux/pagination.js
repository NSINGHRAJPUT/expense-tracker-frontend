import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        pagination: 3,

    }
})