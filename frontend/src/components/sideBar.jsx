import React, { useState } from 'react';
import { ImSearch } from "react-icons/im";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import '../cssFiles/sideBar.css';

const Sidebar = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const addNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: `New Chat ${chatHistory.length + 1}`,
      timestamp: new Date(),
    };
    setChatHistory([newChat, ...chatHistory]);
    setActiveChatId(newChat.id);
  };

  const selectChat = (chatId) => {
    setActiveChatId(chatId);
  };

  const deleteChat = (chatId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this chat?");
    if (confirmDelete) {
      setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
      if (chatId === activeChatId) setActiveChatId(null);
    }
  };

  const clearAllChats = () => {
    const confirmClear = window.confirm("Clear all chat history?");
    if (confirmClear) {
      setChatHistory([]);
      setActiveChatId(null);
    }
  };

  const enableEdit = (chatId, currentTitle) => {
    setEditingId(chatId);
    setEditTitle(currentTitle);
  };

  const saveEdit = (chatId) => {
    setChatHistory(prev =>
      prev.map(chat =>
        chat.id === chatId ? { ...chat, title: editTitle } : chat
      )
    );
    setEditingId(null);
    setEditTitle("");
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">NYAAYA BOT</h1>
      </div>

      <div className="sidebar-actions">
        <button className="new-chat-btn" onClick={addNewChat} aria-label="Start new chat">
          <span className="plus-icon">+</span>
          New Chat
        </button>
        <button className="search-btn" aria-label="Search chats">
          <ImSearch />
        </button>
      </div>

      <div className="conversations-section">
        <div className="conversations-header">
          <span className="conversations-title">Your Conversations</span>
          {chatHistory.length > 0 && (
            <button className="clear-all-btn" onClick={clearAllChats}>
              Clear All
            </button>
          )}
        </div>

        {chatHistory.length === 0 && (
          <div className="empty-state">
            <p>No conversations yet. Start a new chat!</p>
          </div>
        )}

        <div className="chat-group">
          {chatHistory.map(chat => (
            <div
              key={chat.id}
              className={`chat-item ${activeChatId === chat.id ? 'active' : ''}`}
              onClick={() => selectChat(chat.id)}
              title={`Created: ${formatTimestamp(chat.timestamp)}`}
            >
              <span className="chat-icon"><FiMessageCircle /></span>

              {editingId === chat.id ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={() => saveEdit(chat.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit(chat.id);
                  }}
                  className="edit-title-input"
                  autoFocus
                />
              ) : (
                <span className="chat-title">{chat.title}</span>
              )}

              <div className="chat-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  className="chat-action-btn"
                  onClick={() => enableEdit(chat.id, chat.title)}
                  aria-label="Edit chat"
                >
                  <FiEdit2 />
                </button>
                <button
                  className="chat-action-btn"
                  onClick={() => deleteChat(chat.id)}
                  aria-label="Delete chat"
                >
                  <AiOutlineDelete />
                </button>
                {activeChatId === chat.id && <div className="blue-dot"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-bottom">
        <div className="settings-item">
          <IoSettingsOutline className="settings-icon" />
          <span>Settings</span>
        </div>
        <div className="user-profile">
          <div className="user-avatar">AK</div>
          <span className="user-name">Abhinav Krishna B</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
