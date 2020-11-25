import React from 'react';
import ReactGA from 'react-ga';
import {useCookiesUpdate} from '../../CookieContext';

import './style.scss';

export default function CookieBanner(props) {
  const allowCookies = useCookiesUpdate();

  const setAllowCookies = allow => (e) => {
    allowCookies(allow);
    props.onCookieBannerSelection();

    if (allow) {
      props.initAnalytics();
      ReactGA.event({
        category: 'Cookie Consent',
        action: 'Click Okay'
      });
    }
  };

  return (
    <>
      {
        props.displayCookieExplanation &&
        <div className="cookie-explanation">
          We use cookies to save your settings, for basic Google Analytics, and for no other reason.
        </div>
      }

      <div className="cookie-banner">
        Can we use cookies?
        <div className="cookie-banner__ctas">
          <button className="cookie-banner__cta" onClick={setAllowCookies(true)}>Yes</button>
          <button className="cookie-banner__cta" onClick={setAllowCookies(false)}>No</button>
          {
            !props.displayCookieExplanation &&
            <button className="cookie-banner__cta" onClick={props.onCookieExplanation}>Why?</button>
          }
        </div>
      </div>
    </>
   );
};
