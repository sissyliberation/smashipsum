import React, {useEffect}  from 'react';
import cookie from 'react-cookies';
import { Layout } from 'antd';
import {useCookies} from '../../CookieContext';
import {useTheme, useThemeUpdate} from '../../ThemeContext';
import {cookieNames} from '../../data';
import './style.scss';

const { Header } = Layout;

export default function HeaderContent(props) {
  const cookieConsent  = useCookies();

  const { darkTheme, themeClass } = useTheme();
  const toggleTheme = useThemeUpdate();
  const changeTheme = (e) => {
    toggleTheme();
  };

  useEffect(() => {
    if (cookieConsent) {
      cookie.save(cookieNames.darkMode, darkTheme, { path: '/' });
    }
  }, [darkTheme]);

  return (
    <Header className={`header ${themeClass}`}>
      <div className="header__container">
      	<div className="header__left">
      		<a className="header__home-link" href="/">
      			Smash<span>Ipsum</span>
      		</a>
      	</div>
      	<div className="header__right">
      		<a className="header__link" onClick={props.onAnchorScroll('settings')} href="#settings">Settings</a>
      		<a className="header__link" onClick={props.onAnchorScroll('generator')} href="#generator">Generator</a>
          <button className="header__link" onClick={changeTheme} aria-label="toggle lite / dark mode"> {darkTheme ? 'Lite' : 'Dark'} Mode</button>
      	</div>
      </div>
    </Header>
   );
};
