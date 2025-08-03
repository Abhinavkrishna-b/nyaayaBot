import '../cssFiles/header.css'
export const Header = ({ translation }) => {
  return (
    <div className="header-section">
      <h1 id="main-title">
        {translation.title} <span>🇮🇳</span>
      </h1>
      <p className="header-subtitle">{translation.subtitle}</p>
      <div className="header-underline"></div>
    </div>
  );
};
