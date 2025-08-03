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
    setIsLoading(true);

    try {
      const response = await fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, language: selectedLanguage }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      const newMessage = {
        query,
        answer: data.answer,
        timestamp: Date.now(),
      };

      setChatMessages((prev) => [...prev, newMessage]);

      setTimeout(() => {
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
          resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (error) {
      const errorMessage = {
        query,
        answer: '❌ An error occurred. Please check the server connection and try again.',
        timestamp: Date.now(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
      console.error('Search Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setChatMessages([]);
    setCurrentQuery('');
    const input = document.getElementById('query-input');
    if (input) input.focus();
  };

  const handleScrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
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
          {isLoading && <Loader />}
          {chatMessages.map((message, index) => (
            <ChatResponse key={index} answer={message.answer} />
          ))}
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
