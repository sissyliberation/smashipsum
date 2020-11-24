import React, { useContext, useState} from 'react';
import cookie from 'react-cookies';

const CookieContext = React.createContext();
const CookieUpdateContext = React.createContext();

export const useCookies = () => {
  return useContext(CookieContext);
};

export const useCookiesUpdate = () => {
  return useContext(CookieUpdateContext);
};

export const CookieProvider = ({children}) => {
  const [cookieConsent, setCookieConsent] = useState(false);

  const allowCookies = (val) => {
    setCookieConsent(val);
    cookie.save('smashipsum__cookie-consent', val, { path: '/' });
  }

  return (
    <CookieContext.Provider value={cookieConsent}>
      <CookieUpdateContext.Provider value={allowCookies}>
        {children}
      </CookieUpdateContext.Provider>
    </CookieContext.Provider>
  )
};
