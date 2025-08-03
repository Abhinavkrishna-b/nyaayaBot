import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('light'); // default to 'light'

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme) => {
    document.body.classList.remove('dark-mode', 'normal-mode');

    if (newTheme === 'dark') {
      document.body.classList.add('dark-mode');
    } else if (newTheme === 'normal') {
      document.body.classList.add('normal-mode');
    }

    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    let nextTheme;
    if (theme === 'light') nextTheme = 'normal';
    else if (theme === 'normal') nextTheme = 'dark';
    else nextTheme = 'light';

    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const getThemeIconPath = () => {
    switch (theme) {
      case 'dark':
        return "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.55-1.69 4.9z";
      case 'normal':
        return "M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.59a.75.75 0 11-1.06-1.06l1.59-1.59a.75.75 0 011.06 0zm-11.48 0a.75.75 0 011.06 0l1.59 1.59a.75.75 0 11-1.06 1.06L6.106 7.166a.75.75 0 010-1.06zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM3.75 12a.75.75 0 010-1.5h2.25a.75.75 0 010 1.5H3.75zM18 12a.75.75 0 010-1.5h2.25a.75.75 0 010 1.5H18zM6.106 18.894a.75.75 0 011.06 0l1.59-1.591a.75.75 0 111.06 1.06l-1.59 1.59a.75.75 0 01-1.06 0zM18.894 18.894a.75.75 0 010-1.06l-1.59-1.59a.75.75 0 11-1.06 1.06l1.59 1.59a.75.75 0 011.06 0z";
      default: // light
        return "M11.25 3.009A9.75 9.75 0 0019.5 12.75a.75.75 0 11-1.5 0 8.25 8.25 0 01-8.25-8.25.75.75 0 01.75-1.5z M9.458 3.235a.75.75 0 01.65.65 8.25 8.25 0 008.25 8.25.75.75 0 01.65.65 9.75 9.75 0 11-9.55-9.55z";
    }
  };

  const getThemeTitle = () => {
    switch (theme) {
      case 'dark':
        return 'Switch to Normal Mode';
      case 'normal':
        return 'Switch to Light Mode';
      default:
        return 'Switch to Dark Mode';
    }
  };

  return {
    theme,
    toggleTheme,
    getThemeIconPath,
    getThemeTitle
  };
};
