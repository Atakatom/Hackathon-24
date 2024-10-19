import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './style.css'

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when new messages are added
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);

      const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevents newline in the textarea
            sendMessage();
        }
    };

    const sendMessage = async () => {
        if (input.trim() === '') return;
        console.log('sendMessage', sendMessage)
        // Add user's message to the chat
        setMessages([...messages, { sender: 'user', text: input }]);
        setInput('');

        const ses_id=Date.now()
        console.log(ses_id)
        try {
            const body = {
                "body": "{\"messages\": [{\"role\": \"user\", \"content\": [{\"type\": \"text\", \"text\": \"" + input + "\"}]}]}",
                "session_id": ses_id.toString()
            }
            const url = `https://xd424xhfs9.execute-api.us-west-2.amazonaws.com/FinSmart-Stage/process-text`;

            const response = await axios.post(url, body);
            
        console.log('response', response)
            if (response.data && typeof response.data.agent_output === 'string') {
                setMessages(prev => [...prev, { sender: 'ai', text: response.data.agent_output }]);
            } else {
                console.error('Invalid AI response:', response.data);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-container">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={2}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatComponent;
