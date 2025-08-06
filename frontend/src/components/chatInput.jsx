// In frontend/src/components/chatInput.jsx

import { useState, useEffect } from 'react';
import '../cssFiles/chatInput.css';

export const ChatInput = ({ translation, onSubmit, isLoading, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);

  // This effect ensures the input box updates when a suggestion chip is clicked
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your validation for empty input - this is great!
    if (!query.trim()) {
      const input = document.getElementById('query-input');
      if (input) {
        input.focus();
        input.style.borderColor = 'var(--warning-amber)';
        setTimeout(() => {
          input.style.borderColor = 'var(--border-color)';
        }, 2000);
      }
      return;
    }

    // Pass the query up to App.jsx to be processed
    onSubmit(query.trim());

    // --- THIS IS THE FIX ---
    // After submitting, we clear the local state of the input box.
    setQuery('');
  };

  return (
    <div className="control-group">
      <label className="control-label" htmlFor="query-input">Ask Your Question</label>
      <form onSubmit={handleSubmit}>
        <div id="search-container">
          <input
            type="text"
            id="query-input"
            placeholder={translation.placeholder}
            value={query} // The value is controlled by our state
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="sentences"
            spellCheck="true"
            disabled={isLoading}
          />
          <button
            id="ask-button"
            type="submit"
            aria-label="Ask Question"
            disabled={isLoading || !query.trim()} // Also disable if input is just spaces
            style={{
              // Your cool button scaling effect
              transform: query.length > 0 ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            {translation.button}
          </button>
        </div>
      </form>
    </div>
  );
};