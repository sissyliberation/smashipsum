import React from 'react';
import { Button } from 'antd';

import './style.scss';

export default function Ipsum(props) {
  return (
    <div className="ipsum" id="generator">
      <h2>Smash Ipsum Generator</h2>
      <div className="ipsum__content">
        <pre>{ props.ipsum }</pre>
      </div>

      <div className="ipsum__cta-container">
        <Button className="ipsum__cta" onClick={props.getData}>Let's Go</Button>

        <Button className="ipsum__cta ipsum__cta--copy" onClick={props.copyData}>Copy</Button>
      </div>
    </div>
   );
};
