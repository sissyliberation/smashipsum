import cookie from 'react-cookies';
// cookies
const cookiePrefix = 'smashipsum__';

export const cookieNames = {
  'cookieConsent': `${cookiePrefix}cookie-consent`,
  'darkMode': `${cookiePrefix}dark-mode`,
  'settings': `${cookiePrefix}settings`
};

// initial cookie consent state
const cookieConsentValue = cookie.load(cookieNames.cookieConsent);
let cookieConsentVal;

if (cookieConsentValue === "true") {
  cookieConsentVal = true;
}
else if (cookieConsentValue === "false") {
  cookieConsentVal = false;
}
else {
  cookieConsentVal = undefined;
}

export const initialCookieConsentVal = cookieConsentVal;

// initial settings state
export const defaultSettings = {
  minWords:       5,
  maxWords:       15,
  minSentences:   3,
  maxSentences:   7,
  numParagraphs:  4,
  format:         'plain',
  smash64:  {
    characters: true,
    stages:     true,
    items:      true,
  },
  melee:  {
    characters: true,
    stages:     true,
    items:      true,
  },
  brawl:  {
    characters: true,
    stages:     true,
    items:      true,
  },
  pm:  {
    characters: true,
    stages:     true,
    items:      true,
  },
  smash4:  {
    characters: true,
    stages:     true,
    items:      true,
  },
  ultimate: {
    characters: true,
    stages:     true,
    items:      true,
  },
};

// theme classes
export const themeClasses = {
  dark: '',
  lite: 'lite-mode'
};
