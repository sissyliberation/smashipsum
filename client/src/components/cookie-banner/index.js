import React from 'react';

import './style.scss';

export default function CookieBanner(props) {
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
          <button className="cookie-banner__cta" onClick={props.onCookieBannerSelection(true)}>Ok</button>
          <button className="cookie-banner__cta" onClick={props.onCookieBannerSelection(false)}>No</button>
          {
            !props.displayCookieExplanation &&
            <button className="cookie-banner__cta" onClick={props.onCookieExplanation}>Why?</button>
          }
        </div>
      </div>
    </>
   );
};
