import { createSlice } from "@reduxjs/toolkit";

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState: { leaderboardData: [], showLeaderboard: false },
    reducers: {
        fetchLeaderboard(state, action) {
            state.leaderboardData = action.payload;
        },
        showLeaderboardHandler(state) {
            state.showLeaderboard = !state.showLeaderboard;
        }
    }
})

export const leaderboardSliceActions = leaderboardSlice.actions;

export default leaderboardSlice;