// In frontend/src/App.jsx

import { useState, useRef } from 'react';
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
  const [chatMessages, setChatMessages] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const containerRef = useRef(null);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleSuggestionClick = (query) => {
    setCurrentQuery(query);
    performSearch(query);
  };

  const handleFormSubmit = (query) => {
    setCurrentQuery('');
    performSearch(query);
  };

  const performSearch = async (query) => {
    if (!query.trim()) return;

    setIsLoading(true);

    const userMessage = {
      isUser: true,
      query: query,
      timestamp: Date.now(),
    };
    setChatMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
            resultsContainer.scrollTop = resultsContainer.scrollHeight;
        }
    }, 100);


    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query_text: query }),
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

  const handleClearChat = () => {
    setChatMessages([]);
    setCurrentQuery('');
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
          {chatMessages.map((message, index) => (
            <ChatResponse
              key={index}
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