import React from 'react';
import { Button } from 'antd';

import './style.scss';

export default function Ipsum(props) {
  return (
    <div className="ipsum">
      <h2>Smash Ipsum Generator</h2>
      <div className="ipsum__content">
        <pre>{ props.ipsum }</pre>
      </div>

      <div className="ipsum__cta">
        <Button onClick={props.getData}>Let's Go</Button>
      </div>
    </div>
   );
};