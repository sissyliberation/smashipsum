import React, { useContext, useState} from 'react';
import cookie from 'react-cookies';

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useThemeUpdate = () => {
  return useContext(ThemeUpdateContext);
};

const cookieConsentValue = cookie.load('smashipsum__cookie-consent');
let initialCookieConsentVal;

if (cookieConsentValue === "true") {
  initialCookieConsentVal = true;
}
else if (cookieConsentValue === "false") {
  initialCookieConsentVal = false;
}
else {
  initialCookieConsentVal = undefined;
}

const darkModeCookieValue = cookie.load('smashipsum__darkmode');

let initialDarkTheme = true;
let initialThemeClass = "";

if (initialCookieConsentVal) {
  if (darkModeCookieValue && darkModeCookieValue !== 'true') {
    initialDarkTheme = false;
    initialThemeClass = "lite-mode";
  }
}

export const ThemeProvider = ({children}) => {
  const [darkTheme, setDarkTheme] = useState(initialDarkTheme);
  const [themeClass, setThemeClass] = useState(initialThemeClass);

  const toggleTheme = val => {
    if (val !== undefined) {
      setDarkTheme(val);
      setThemeClass(val ? "" : "lite-mode");
    }
    else {
      setDarkTheme(prevDarkTheme => !prevDarkTheme);
      setThemeClass(prevThemeClass => prevThemeClass !== "" ? "" : "lite-mode");
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
