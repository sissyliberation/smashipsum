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

const cookieConsentValue = cookie.load('smashipsum__cookie-consent');
let initialCookieConsentVal;

if (cookieConsentValue === "true") {
  initialCookieConsentVal = true;
}
else if (cookieConsentValue == "false") {
  initialCookieConsentVal = false;
}
else {
  initialCookieConsentVal = undefined;
}

export const CookieProvider = ({children}) => {
  const [cookieConsent, setCookieConsent] = useState(initialCookieConsentVal);

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
