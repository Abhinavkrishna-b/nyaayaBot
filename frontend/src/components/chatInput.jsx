import { useState, useEffect } from 'react';
import '../cssFiles/chatInput.css'

export const ChatInput= ({ translation, onSubmit, isLoading, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    onSubmit(query.trim());
  };

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  return (
    <div className="control-group">
      <label className="control-label" htmlFor="query-input">Ask Your Question</label>
      <form onSubmit={handleSubmit}>
        <div id="search-container">
          <input 
            type="text" 
            id="query-input" 
            placeholder={translation.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="sentences"
            spellCheck="true"
          />
          <button 
            id="ask-button" 
            type="submit"
            aria-label="Ask Question"
            disabled={isLoading}
            style={{
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
