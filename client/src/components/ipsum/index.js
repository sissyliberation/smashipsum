import React from 'react';
import { useTheme } from '../../ThemeContext';
import { Button } from 'antd';

import './style.scss';

export default function Ipsum(props) {
  const { themeClass } = useTheme();
  return (
    <div className={`ipsum ${themeClass}`} id="generator">
      <div className="ipsum__container">      
        <h2>Smash Ipsum Generator</h2>
        <div className="ipsum__content">
          <pre>{ props.ipsum }</pre>
        </div>

        <div className="ipsum__cta-container">
          <Button className="ipsum__cta" onClick={props.getData}>Generate</Button>

          <Button className="ipsum__cta ipsum__cta--copy" onClick={props.copyData}>{props.ipsumCopied ? 'Copied' : 'Copy'}</Button>
        </div>
      </div>
    </div>
   );
};
