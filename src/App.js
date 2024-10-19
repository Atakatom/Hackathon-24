// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';

// const App = () => {
//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const userMessage = message;
//     const body = {
//       "model_id": "anthropic.claude-3-5-sonnet-20240620-v1:0",
//       "messages": [
//         {
//           "role": "user",
//           "content": [
//             {
//               "type": "text",
//               "text": "You are an AI assistant named Fasty that helps kids learn financial literacy. Here are your personality traits:\n- You need the help of the kid for your basic needs.\n- You are joyful and friendly.\n- Sometimes you make funny and silly jokes, but remember, you're talking to a kid!\n- You may ask the kid to buy things, but if they explain properly why you shouldn’t, you should agree. If they can't, you can huff.\n Wait for new messages"
//             }
//           ]
//         }
//       ]
//     };

//     const corsProxy = 'https://cors-anywhere.herokuapp.com/';
//     const url = `${corsProxy}https://xd424xhfs9.execute-api.us-west-2.amazonaws.com/FinSmart-Stage/process-text`;

//     axios.post(url, body)
//       .then(response => {
//         setLoading(false);
//         setChat(prev => [...prev.slice(0, -1), { user: userMessage, bot: response.data?.model_output }]);
//       }).catch(error => {
//         console.log('err', error)
//         setLoading(false);
//         setChat(prev => [...prev.slice(0, -1), { user: userMessage, bot: 'Oops! Something went wrong.' }]);
//       })
//   }, [])

//   const handleSendMessage = async () => {
//     if (message.trim()) {
//       const userMessage = message;
//       setMessage('');
//       setChat(prev => [...prev, { user: userMessage, bot: '' }]);

//       try {
//         setLoading(true);
//         const corsProxy = 'https://cors-anywhere.herokuapp.com/';
//         const url = `${corsProxy}https://xd424xhfs9.execute-api.us-west-2.amazonaws.com/FinSmart-Stage/process-text`;

//         const response = await axios.post(url, {
//           model_id: "anthropic.claude-3-5-sonnet-20240620-v1:0",
//           messages: [
//             {
//               role: 'user',
//               content: [
//                 {
//                   type: 'text',
//                   text: userMessage,
//                 },
//               ],
//             },
//           ],
//         });

//         console.log('response', response)
//         setLoading(false);
//         setChat(prev => [...prev.slice(0, -1), { user: userMessage, bot: response.data?.model_output }]);
//       } catch (error) {
//         setLoading(false);
//         setChat(prev => [...prev.slice(0, -1), { user: userMessage, bot: 'Oops! Something went wrong.' }]);
//       }
//     }
//   };

//   return (
//     <>
//       <div className="app">
//         <div className="chat-container">
//           {chat.map((entry, index) => (
//             <div key={index} className="chat-bubble">
//               <div className="user-bubble">{entry.user}</div>
//               <div className="bot-bubble">{entry.bot}</div>
//             </div>
//           ))}
//           {loading && <div className="loading">Fasty is typing...</div>}
//         </div>
//         <div className="input-container">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="chat-input"
//           />
//           <button onClick={handleSendMessage} className="send-button">Send</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;

import './App.css';
import SlidePuzzle from './components/slide-puzzle/index.js';

const App = () => {

  return (
    <>
      <div className='phone-case'>
        <div className="navbar">
          <div className="hamburger-icon">☰</div>
          <div className="label">FinSmart</div>
        </div>
        <SlidePuzzle />
        {/* <div class="image-container">

          <img src="../public/fasty.jpg" alt="" class="image" />
        </div> */}
      </div>
    </>
  )
}

export default App;