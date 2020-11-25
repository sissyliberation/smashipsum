import React, { useContext, useState} from 'react';
import cookie from 'react-cookies';
import {cookieNames, themeClasses, initialCookieConsentVal} from './data';

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useThemeUpdate = () => {
  return useContext(ThemeUpdateContext);
};

const darkModeCookieValue = cookie.load(cookieNames.darkMode);

let initialDarkTheme = true;
let initialThemeClass = themeClasses.dark;

if (initialCookieConsentVal) {
  if (darkModeCookieValue && darkModeCookieValue !== 'true') {
    initialDarkTheme = false;
    initialThemeClass = themeClasses.lite;
  }
}

export const ThemeProvider = ({children}) => {
  const [darkTheme, setDarkTheme] = useState(initialDarkTheme);
  const [themeClass, setThemeClass] = useState(initialThemeClass);

  const toggleTheme = val => {
    if (val !== undefined) {
      setDarkTheme(val);
      setThemeClass(val ? themeClasses.dark : themeClasses.lite);
    }
    else {
      setDarkTheme(prevDarkTheme => !prevDarkTheme);
      setThemeClass(prevThemeClass => prevThemeClass !== themeClasses.dark ? themeClasses.dark : themeClasses.lite);
    }
  }

  return (
    <ThemeContext.Provider value={{darkTheme, themeClass}}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  )
};
