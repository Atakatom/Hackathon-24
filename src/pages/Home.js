import TopNavbar from "../components/top-navbar";
import { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [money, setMoney] = useState(35)
  const [waterRatio, setWaterRatio] = useState(50)
  const [foodRatio, setFoodRatio] = useState(50)
  const [responseOutput, setResponseOutput] = useState('')

  const handleBuyCarrotClick = () => {
    setFoodRatio(foodRatio + 3)
    setMoney(money - 5)
  }

  const handleBuyWaterClick = () => {
    setWaterRatio(waterRatio + 3)
    setMoney(money - 2)
  }

  const handleTextChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const body = {
        "session_id": "1234t",
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

      const response = await axios.post(url, body)
      console.log('response', response)
      setQuestion('')
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
    const url = `https://xd424xhfs9.execute-api.us-west-2.amazonaws.com/FinSmart-Stage/process-text`;

    axios.post(url, body)
      .then(response => console.log(response.data))
      .catch(error => console.log('Error:', error))
  }, [])

  return (
    <>
      <div className="phone-case">
        <TopNavbar />
        <em>Para: {money}</em>
        <em>Su Oranı {waterRatio}</em>
        <em>Tokluk {foodRatio}</em>

        <button onClick={handleBuyCarrotClick}>Havuç Al 5$</button>
        <button onClick={handleBuyWaterClick}>Su Al 2$</button>

        <div>
          <textarea
            value={question}
            onChange={handleTextChange}
            rows={5}
            cols={40}
            placeholder="Enter your text here"
          />
          <br />
          <button onClick={handleSubmit} disabled={loading}>Gönder</button>

          {loading && <div className="loader">Loading...</div>}  {/* Show loader when loading */}

        </div>


      </div>
    </>
  );
};

export default Home;