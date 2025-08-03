import '../cssFiles/loader.css'
export const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p className="thinking-message">Consulting AI legal assistant...</p>
    </div>
  );
};
