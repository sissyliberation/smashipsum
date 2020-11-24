import React, { useContext, useState} from 'react';

const CookieContext = React.createContext();
const CookieUpdateContext = React.createContext();

export const useCookies = () => {
  return useContext(CookieContext);
};

export const useThemeUpdate = () => {
  return useContext(CookieUpdateContext);
};

export const CookieProvider = ({children}) => {
  const [useCookies, setUseCookies] = useState(false);

  const allowCookies = () => {
    setUseCookies(prevUseCookies => !prevUseCookies);
  }

  return (
    <CookieContext.Provider value={{useCookies}}>
      <CookieUpdateContext.Provider value={allowCookies}>
        {children}
      </CookieUpdateContext.Provider>
    </CookieContext.Provider>
  )
};
