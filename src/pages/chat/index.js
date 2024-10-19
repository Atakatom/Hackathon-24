import TopNavbar from "../../components/top-navbar";
import { useEffect, useState } from "react";
import axios from 'axios'
import Tracks from "../../components/tracks";
import './style.css'

const Chat = () => {
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState('');
    const [responseOutput, setResponseOutput] = useState('')

    const handleTextChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const body = {
                "session_id": `${Date.now()}`,
                "body": {
                    "messages": [
                        {
                            "role": "user",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "You are an AI assistant named Fasty that helps kids learn financial literacy. Here are your personality traits:\n- You need the help of the kid for your basic needs.\n- You are joyful and friendly.\n- Sometimes you make funny and silly jokes, but remember, you're talking to a kid!\n- You may ask the kid to buy things, but if they explain properly why you shouldn’t, you should agree. If they can't, you can huff.\n Wait for new messages"
                                }
                            ]
                        }
                    ]
                }
            };

            const corsProxy = 'https://cors-anywhere.herokuapp.com/';
            const url = `${corsProxy}https://xd424xhfs9.execute-api.us-west-2.amazonaws.com/FinSmart-Stage/process-text`;

            const response = await axios.post(url, body)
            console.log('response', response)
            setQuestion('')
            setResponseOutput(response?.data?.model_output)
            console.log('response', response?.data)
        } catch (error) {
            console.error('Error submitting text:', error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        const body = {
            "session_id": "1234",
            "body": {
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": "You are an AI assistant named Fasty that helps kids learn financial literacy. Here are your personality traits:\n- You need the help of the kid for your basic needs.\n- You are joyful and friendly.\n- Sometimes you make funny and silly jokes, but remember, you're talking to a kid!\n- You may ask the kid to buy things, but if they explain properly why you shouldn’t, you should agree. If they can't, you can huff.\n Wait for new messages"
                            }
                        ]
                    }
                ]
            }
        };

        // const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        // const url = `${corsProxy}https://xd424xhfs9.execute-api.us-west-2.amazonaws.com/FinSmart-Stage/process-text`;
        const url = `https://xd424xhfs9.execute-api.us-west-2.amazonaws.com/FinSmart-Stage/process-text`;

        axios.post(url, body)
            .then(response => console.log(response.data))
            .catch(error => console.log('Error:', error))
    }, [])

    return (
        <div className="phone-case" >
            <TopNavbar />
            <Tracks />
            <div className="messageField">
                <textarea
                    value={question}
                    onChange={handleTextChange}
                    rows={5}
                    cols={40}
                    placeholder="Hızlı'ya yaz, sohbete başla"
                />
                <br />
                <button className="submit" onClick={handleSubmit} disabled={loading}>Gönder</button>
                {loading && <div className="loader">Loading...</div>}  {/* Show loader when loading */}
            </div>
            <img src="/images/bottom.png" className="bottom" alt='' />
        </div>
    )
}

export default Chat