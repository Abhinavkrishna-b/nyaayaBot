// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import Chatbot from './components/chatBot';
import Sidebar from './components/sideBar';
import '../src/cssFiles/App.css';

function App() {
    const [conversations, setConversations] = useState([]);

    const [activeConversationId, setActiveConversationId] = useState(null);

    const activeConversation = conversations.find(
        (conv) => conv.id === activeConversationId
    );
    const activeMessages = activeConversation ? activeConversation.messages : [];
    const activeConversationTitle = activeConversation ? activeConversation.title : 'New Chat';

    const handleSelectConversation = (id) => {
        setActiveConversationId(id);
    };

    const handleNewChat = () => {
        const newId = `conv-${Date.now()}`;
        const newConversation = {
            id: newId,
            title: 'New Chat',
            messages: [],
        };
        setConversations((prev) => [...prev, newConversation]);
        setActiveConversationId(newId); 
    };

    const handleSendMessage = (newMessage) => {
        setConversations((prevConversations) =>
            prevConversations.map((conv) => {
                if (conv.id === activeConversationId) {
                    const updatedConv = { ...conv, messages: [...conv.messages, newMessage] };

                    if (conv.title === 'New Chat' && newMessage.type === 'user' && conv.messages.length === 0) {
                        updatedConv.title = newMessage.text.substring(0, 30) + (newMessage.text.length > 30 ? '...' : '');
                    }
                    return updatedConv;
                }
                return conv;
            })
        );
    };

    const handleEditConversation = (id, newTitle) => {
        setConversations((prev) =>
            prev.map((conv) => (conv.id === id ? { ...conv, title: newTitle } : conv))
        );
    };

    const handleDeleteConversation = (id) => {
        setConversations((prev) => {
            const updatedConversations = prev.filter((conv) => conv.id !== id);
            if (activeConversationId === id) {
                setActiveConversationId(updatedConversations[0]?.id || null);
            }
            return updatedConversations;
        });
    };

    useEffect(() => {
        if (conversations.length === 0 && activeConversationId === null) {
            handleNewChat();
        }
    }, [conversations, activeConversationId]);


    return (
        <div className="app-container">
            <Sidebar
                conversations={conversations}
                activeConversationId={activeConversationId}
                onSelectConversation={handleSelectConversation}
                onNewChat={handleNewChat}
                onEditConversation={handleEditConversation}
                onDeleteConversation={handleDeleteConversation}
            />

            <main className="main-content">
                <Chatbot
                    messages={activeMessages}
                    onSendMessage={handleSendMessage}
                    activeConversationTitle={activeConversationTitle}
                    hasConversations={conversations.length > 0} 
                />
            </main>
        </div>
    );
}

export default App;
