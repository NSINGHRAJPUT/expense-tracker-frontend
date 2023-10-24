import axios from "axios";

const Purchase = ({ premium, setPremium, token, isPremium }) => {
    /////////////////////               PURCHASE PREMIUM                   ////////////////////////
    //                                                                                           //
    //                                                                                           //   
    ///////////////////////////////////////////////////////////////////////////////////////////////
    const premiumHandler = (e) => {
        e.preventDefault();
        const token = e.target.value
        axios.get('http://localhost:3000/premium/get-premium', { headers: { 'Authorization': token } })
            .then((response) => {
                console.log(response)
                let options = {
                    "key": response.data.key_id,
                    "order_id": response.data.order.id,
                    "handler": async function (response) {
                        console.log(response)
                        axios.post('http://localhost:3000/premium/update-premium', { ...response }, { headers: { "Authorization": token } })
                            .then((res) => console.log(res))
                            .catch(err => console.log(err))
                        alert('You are a Premium User Now')
                        setPremium(true);
                        isPremium = true;
                    }
                }
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
                e.preventDefault();
                rzp1.on('payment.failed', (response) => {
                    console.log(response)
                    alert('Payment Declined')
                })
            })
            .catch(err => console.log(err))
    }

    return <div className="animate__animated animate__heartBeat animate__slower animate__infinite premiumbtn">
        {!premium && <button value={token} onClick={premiumHandler}>Buy Premium</button>}
    </div>
}

export default Purchase;