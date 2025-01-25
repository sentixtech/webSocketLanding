import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';

const Chat = ({ messages, sendMessage }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage('chat', {
        type: 'chat',
        text: message,
        timestamp: new Date().toISOString(),
        user: 'You'
      });
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Live Chat</h2>
        <span className="online-users">5 users online</span>
      </div>

      <div className="messages-container">
        {messages.filter(m => m.channel === 'chat').map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.user === 'You' ? 'message-own' : 'message-other'}`}
          >
            <div className="message-header">
              <span className="message-user">{msg.user}</span>
              <span className="message-time">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="message-content">{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
