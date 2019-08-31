import React from 'react';

import './style.scss';

export default function CookieBanner(props) {
  return (
    <div className="cookie-banner">
      Can we use cookies?

      <div className="cookie-banner__ctas">
        <button className="cookie-banner__cta" value={true} onClick={props.onCookieBannerSelection}>Yes</button>
        <button className="cookie-banner__cta" value={false} onClick={props.onCookieBannerSelection}>No</button>
      </div>
    </div>
   );
};