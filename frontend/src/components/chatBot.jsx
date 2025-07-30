import React, { useState, useRef, useEffect } from 'react';
import '../cssFiles/chatBot.css';
import { FiSend } from "react-icons/fi";

function Chatbot({ messages, onSendMessage, activeConversationTitle, hasConversations }) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatHistoryRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    await onSendMessage(query);
    setQuery('');
    setIsLoading(false);
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot-main-container">
      <div className="chat-header">
        <h2 className="chat-title">NaayBot</h2>
      </div>

      <div className="chat-history-display" ref={chatHistoryRef}>
        {(!hasConversations || messages.length === 0) ? (
          <p className="welcome-message">Ask your legal questions in plain language. NaayBot will help you with the answers!</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`message-bubble ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}>
              {msg.role === 'assistant' && (
                <img src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" alt="Bot" className="w-8 h-8 rounded-full mr-2" />
              )}
              <div className="message-content">
                <p className="message-text">{msg.content}</p>
                {msg.sources && (
                  <div className="sources-display">
                    <strong>Sources:</strong>
                    <ul className="sources-list">
                      {msg.sources.map((src, i) => (
                        <li key={i}><a href={src} target="_blank" rel="noopener noreferrer">{src}</a></li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="User" className="w-8 h-8 rounded-full ml-2" />
              )}
            </div>
          ))
        )}
        {isLoading && <p className="loading-indicator">NaayBot is thinking...</p>}
      </div>

      <form onSubmit={handleSubmit} className="query-input-form">
        <textarea
          className="query-textarea"
          placeholder="Ask your question here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={1}
        />
        <button
          type="submit"
          className="send-button"
          disabled={!query.trim() || isLoading}
        >
          <FiSend className="send-icon" />
        </button>
      </form>
    </div>
  );
}

export default Chatbot;
