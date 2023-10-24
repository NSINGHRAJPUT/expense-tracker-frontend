import { useNavigate } from "react-router";
import Leaderboard from "../premium/Leaderboard";
import { useDispatch, useSelector } from "react-redux";
import { leaderboardSliceActions } from "../../redux/leaderboard";
import axios from "axios";

const Header = ({ token, premium, premiumHandler }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showLeaderboard = useSelector(state => state.leaderboard.showLeaderboard)

    const leaderboradHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:3000/premium/show-users')
            dispatch(leaderboardSliceActions.fetchLeaderboard(response.data))
            dispatch(leaderboardSliceActions.showLeaderboardHandler());
        }
        catch (err) {
            console.log(err)
        }
    }

    return <div className='navbar'>
        <h1 className='spaceX'><span>Expense </span> Tracker <span> App</span></h1>
        <div className="animate__animated animate__heartBeat animate__slower animate__infinite premiumbtn">
            {!premium && <button value={token} onClick={premiumHandler}>Buy Premium</button>}

        </div>
        <div className="animate__animated animate__heartBeat animate__slower animate__infinite premiumbtn">
            {premium && <button value={token} onClick={leaderboradHandler}>Show Leaderboard</button>}
        </div>
        {showLeaderboard && <div className={showLeaderboard ? 'outer' : 'hide-outer'}>
            <div className='leaderboard' >
                <Leaderboard />
            </div></div>}
        <div className="premiumbtn">
            <button onClick={() => navigate('/')}>logout</button>
        </div>
    </div>
}

export default Header;