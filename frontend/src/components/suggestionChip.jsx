import '../cssFiles/suggestionChips.css'
export const SuggestionChips = ({ translation, onSuggestionClick }) => {
  const suggestions = [
    { text: translation.chips[0], query: "What are my fundamental rights in India?" },
    { text: translation.chips[1], query: "How to file an FIR?" },
    { text: translation.chips[2], query: "Consumer protection laws" },
    { text: translation.chips[3], query: "Labour law rights in India" }
  ];

  return (
    <div className="suggestions-container">
      <div className="suggestions-title">Quick Questions:</div>
      <div className="suggestions-grid">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index}
            className="suggestion-chip" 
            onClick={() => onSuggestionClick(suggestion.query)}
          >
            {suggestion.text}
          </div>
        ))}
      </div>
    </div>
  );
};
