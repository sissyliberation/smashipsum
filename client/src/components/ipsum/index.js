import React from 'react';
import { Button } from 'antd';

import './style.scss';

export default function Ipsum(props) {
  return (
    <div className="smash-ipsum">
      <h2>Smash Ipsum Generator</h2>
      <div className="smash-ipsum__content">
        { props.ipsum }
      </div>

      <div className="smash-ipsum__cta">
        <Button onClick={props.getData}>Ghost</Button>
      </div>
    </div>
   );
};