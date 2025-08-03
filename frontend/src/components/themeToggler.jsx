import { useTheme } from './useTheme';
import '../cssFiles/themeToggler.css'
export const ThemeToggle = () => {
  const { toggleTheme, getThemeIconPath, getThemeTitle } = useTheme();

  return (
    <button 
      id="theme-toggle" 
      title={getThemeTitle()} 
      aria-label={getThemeTitle()}
      onClick={toggleTheme}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d={getThemeIconPath()} />
      </svg>
    </button>
  );
};
