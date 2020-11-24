import React from 'react';
import {useTheme, useThemeUpdate} from '../../ThemeContext';

import logo64 from '../../img/n64.png';
import logoMelee from '../../img/melee.png';
import logoBrawl from '../../img/brawl.png';
import logoPm from '../../img/pm.png';
import logoWiiu from '../../img/wiiu.png';
import logoUltimate from '../../img/ultimate.png';

import './style.scss';

export default function Hero(props) {
  const { themeClass } = useTheme();

  return (
    <div className={`hero ${themeClass}`}>
      <div className="hero__container">

        <h1>Placeholder Text</h1>

        <div className="hero__content">
          <p>A must if you are any kind of developer or designer. Why not smash it up a bit?</p>
          <p>SmashIpsum gives you all fun, nostalgia, and salt you get from Smash Bros while you pretend to work.</p>
        </div>

        <h2>Featuring every game in the series</h2>

        <div className="hero__content hero__images">
          <div className="hero__image">
            <img className="hero__img" src={logo64} alt="Super Smash Bros logo" />
          </div>

          <div className="hero__image">
            <img className="hero__img" src={logoMelee} alt="Super Smash Bros Melee logo" />
          </div>

          <div className="hero__image">
            <img className="hero__img" src={logoBrawl} alt="Super Smash Bros Brawl logo" />
          </div>

          <div className="hero__image">
            <img className="hero__img" src={logoPm} alt="Project M logo" />
          </div>

          <div className="hero__image">
            <img className="hero__img" src={logoWiiu} alt="Super Smash Bros WiiU logo" />
          </div>

          <div className="hero__image">
            <img className="hero__img hero__img--inverse" src={logoUltimate} alt="Smash Ultimate logo" />
          </div>
        </div>
      </div>
    </div>
   );
};
