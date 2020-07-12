import React from 'react';
import { Layout } from 'antd';

import './style.scss';

const { Header } = Layout;

export default function HeaderContent(props) {
  return (
    <Header className="header">
      <div className="header__container">
      	<div className="header__left">
      		<a className="header__home-link" href="#">
      			Smash<span>Ipsum</span>
      		</a>
      	</div>
      	<div className="header__right">
      		<a className="header__link" onClick={props.onAnchorScroll('settings')} href="#settings">Settings</a>
      		<a className="header__link" onClick={props.onAnchorScroll('generator')} href="#generator">Generator</a>
          <button className="header__link" onClick={props.toggleDarkMode} aria-label="toggle lite / dark mode"> {props.darkMode ? 'Lite' : 'Dark'} Mode</button>
      	</div>
      </div>
    </Header>
   );
};
