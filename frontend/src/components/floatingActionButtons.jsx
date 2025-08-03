import'../cssFiles/floatingActionButtons.css';
export const FloatingActionButtons = ({ onClearChat, onScrollToTop }) => {
  return (
    <div className="fab-container">
      <button 
        className="fab clear-fab" 
        id="clear-chat" 
        title="Clear Chat" 
        aria-label="Clear Chat"
        onClick={onClearChat}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
      <button 
        className="fab scroll-fab" 
        id="scroll-top" 
        title="Scroll to Top" 
        aria-label="Scroll to Top"
        onClick={onScrollToTop}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
        </svg>
      </button>
    </div>
  );
};
