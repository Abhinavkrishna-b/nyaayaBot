import '../cssFiles/languageSelector.css'
export const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  const languages = [
    { value: 'English', label: 'English' },
    { value: 'Tamil', label: 'தமிழ் (Tamil)' },
    { value: 'Hindi', label: 'हिंदी (Hindi)' },
    { value: 'Bengali', label: 'বাংলা (Bengali)' },
    { value: 'Telugu', label: 'తెలుగు (Telugu)' },
    { value: 'Marathi', label: 'मराठी (Marathi)' }
  ];

  return (
    <div className="control-group">
      <label className="control-label" htmlFor="language-selector">Select Language</label>
      <select 
        id="language-selector"
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        {languages.map(lang => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};
