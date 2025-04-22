import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('default');

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('sidekick-theme');
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  // Apply theme to document body
  const applyTheme = (themeName) => {
    // Remove existing theme classes
    document.body.className = '';
    
    // Add the new theme class
    if (themeName && themeName !== 'default') {
      document.body.classList.add(`theme-${themeName}`);
    }
  };

  // Change theme and save to localStorage
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('sidekick-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme,
      changeTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
