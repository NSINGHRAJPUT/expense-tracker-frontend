import { useSelector } from 'react-redux';

const Leaderboard = () => {
    const leaderboardData = useSelector(state => state.leaderboard.leaderboardData);

    return <table className='leaderboard-table'>
        <tbody>
            <tr>
                <th>Name</th>
                <th>Expense</th>
            </tr>
            {leaderboardData.map((userData, i) => {
                return <tr key={i}>
                    <td>{userData.name}</td>
                    <td>{userData.expense}</td>
                </tr>
            })
            }
        </tbody>
    </table>

}

export default Leaderboard;