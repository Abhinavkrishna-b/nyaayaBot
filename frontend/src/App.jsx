import { useState, useRef, useEffect } from 'react'; 
import './cssFiles/App.css';

import { translations } from './components/translations';
import { ThemeToggle } from './components/themeToggler';
import { Header } from './components/header';
import { LanguageSelector } from './components/languageSelector';
import { SuggestionChips } from './components/suggestionChip';
import { ChatInput } from './components/chatInput';
import { Loader } from './components/loader';
import { ChatResponse } from './components/chatResponse';
import { FloatingActionButtons } from './components/floatingActionButtons';

const API_URL = 'http://localhost:8000/api/query';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);

  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const savedMessages = localStorage.getItem('nyaayaBotChatHistory');
      return savedMessages ? JSON.parse(savedMessages) : [];
    } catch (error) {
      console.error("Failed to parse chat history from localStorage", error);
      return [];
    }
  });
  
  const [currentQuery, setCurrentQuery] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('nyaayaBotChatHistory', JSON.stringify(chatMessages));
  }, [chatMessages]);


  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleSuggestionClick = (query) => {
    setCurrentQuery(query);
    handleFormSubmit(query);
  };

  const performSearch = async (query) => {
    setIsLoading(true);

    const recentMessages = chatMessages.slice(-6);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query_text: query,
          chat_history: recentMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const botMessage = {
        isUser: false,
        answer: data.response,
        sources: data.sources,
        timestamp: Date.now(),
      };

      setChatMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      const errorMessage = {
        isUser: false,
        answer: '❌ An error occurred. Please check the backend server connection and try again.',
        timestamp: Date.now(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
      console.error('Search Error:', error);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
          resultsContainer.scrollTop = resultsContainer.scrollHeight;
        }
      }, 100);
    }
  };

  const handleFormSubmit = (query) => {
    if (!query.trim()) return;

    const userMessage = {
      isUser: true,
      query: query,
      timestamp: Date.now(),
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setCurrentQuery('');
    performSearch(query);

    setTimeout(() => {
      const resultsContainer = document.getElementById('results-container');
      if (resultsContainer) {
        resultsContainer.scrollTop = resultsContainer.scrollHeight;
      }
    }, 100);
  };

  const handleClearChat = () => {
    setChatMessages([]);
    setCurrentQuery('');
    localStorage.removeItem('nyaayaBotChatHistory'); 
    const input = document.getElementById('query-input');
    if (input) input.focus();
  };

  const handleScrollToTop = () => {
    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
      resultsContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentTranslation = translations[selectedLanguage];

  return (
    <>
      <div className="container" ref={containerRef}>
        <ThemeToggle />
        <Header translation={currentTranslation} />

        <div id="controls-container">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={handleLanguageChange}
          />
          <SuggestionChips
            translation={currentTranslation}
            onSuggestionClick={handleSuggestionClick}
          />
          <ChatInput
            translation={currentTranslation}
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            initialQuery={currentQuery}
          />
        </div>

        <div id="results-container">
          {chatMessages.map((message) => (
            <ChatResponse
              key={message.timestamp} 
              isUser={message.isUser}
              query={message.query}
              answer={message.answer}
              sources={message.sources}
            />
          ))}
          {isLoading && <Loader />}
        </div>
      </div>

      <FloatingActionButtons
        onClearChat={handleClearChat}
        onScrollToTop={handleScrollToTop}
      />
    </>
  );
}

export default App;