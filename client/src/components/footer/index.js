import React from 'react';
import { useTheme } from '../../ThemeContext';
import { Layout } from 'antd';

import './style.scss';

const { Footer } = Layout;

export default function FooterContent(props) {
  const { themeClass } = useTheme();
  return (
    <Footer className={`footer ${themeClass}`}>
      <div className="footer__inner">
        <div className="footer__container">
          // made by <a href="https://disregardingstandards.com/" target="_blank" rel="noopener noreferrer">Nova Skye</a>
        </div>
      </div>
    </Footer>
   );
};
