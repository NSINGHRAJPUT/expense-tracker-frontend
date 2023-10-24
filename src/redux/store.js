import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expense";
import leaderboardSlice from "./leaderboard";


const store = configureStore({
    reducer: {
        expense: expenseSlice.reducer,
        leaderboard: leaderboardSlice.reducer
    }
})

export default store;