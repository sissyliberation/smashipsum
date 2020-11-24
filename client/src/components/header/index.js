import React from 'react';
import { Layout } from 'antd';
import {useTheme, useThemeUpdate} from '../../ThemeContext';

import './style.scss';

const { Header } = Layout;

export default function HeaderContent(props) {
  const { darkTheme, themeClass } = useTheme();
  const toggleTheme = useThemeUpdate();

  return (
    <Header className={`header ${themeClass}`}>
      <div className="header__container">
      	<div className="header__left">
      		<a className="header__home-link" href="">
      			Smash<span>Ipsum</span>
      		</a>
      	</div>
      	<div className="header__right">
      		<a className="header__link" onClick={props.onAnchorScroll('settings')} href="#settings">Settings</a>
      		<a className="header__link" onClick={props.onAnchorScroll('generator')} href="#generator">Generator</a>
          <button className="header__link" onClick={toggleTheme} aria-label="toggle lite / dark mode"> {darkTheme ? 'Lite' : 'Dark'} Mode</button>
      	</div>
      </div>
    </Header>
   );
};
