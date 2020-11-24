import React, { useContext, useState} from 'react';

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useThemeUpdate = () => {
  return useContext(ThemeUpdateContext);
};

export const ThemeProvider = ({children}) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [themeClass, setThemeClass] = useState("");

  const toggleTheme = () => {
    setDarkTheme(prevDarkTheme => !prevDarkTheme);
    setThemeClass(prevThemeClass => prevThemeClass != "" ? "" : "lite-mode");
  }

  return (
    <ThemeContext.Provider value={{darkTheme, themeClass}}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  )
};
