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
                "body": `{\"messages\": [{\"role\": \"user\", \"content\": [{\"type\": \"text\", \"text\": \"
                ${question}
                \"}]}]}`,
                "session_id": "aaaaaaaaa"
            }
            const url = `https://xd424xhfs9.execute-api.us-west-2.amazonaws.com/FinSmart-Stage/process-text`;

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
            "body": "{\"messages\": [{\"role\": \"user\", \"content\": [{\"type\": \"text\", \"text\": \"_\"}]}]}",
            "session_id": "aaaaaaaaa"
        }

        const url = `https://xd424xhfs9.execute-api.us-west-2.amazonaws.com/FinSmart-Stage/process-text`;

        console.log('url', url)
        console.log('body', body)

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