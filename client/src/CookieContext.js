import React, { useContext, useState} from 'react';
import cookie from 'react-cookies';
import {cookieNames, initialCookieConsentVal} from './data';
const CookieContext = React.createContext();
const CookieUpdateContext = React.createContext();

export const useCookies = () => {
  return useContext(CookieContext);
};

export const useCookiesUpdate = () => {
  return useContext(CookieUpdateContext);
};

export const CookieProvider = ({children}) => {
  const [cookieConsent, setCookieConsent] = useState(initialCookieConsentVal);

  const allowCookies = (val) => {
    setCookieConsent(val);
    cookie.save(cookieNames.cookieConsent, val, { path: '/' });
  }

  return (
    <CookieContext.Provider value={cookieConsent}>
      <CookieUpdateContext.Provider value={allowCookies}>
        {children}
      </CookieUpdateContext.Provider>
    </CookieContext.Provider>
  )
};
