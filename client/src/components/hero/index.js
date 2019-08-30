import React from 'react';

import logo64 from '../../img/n64.png';
import logoMelee from '../../img/melee.png';
import logoBrawl from '../../img/brawl.png';
import logoPm from '../../img/pm.png';
import logoWiiu from '../../img/wiiu.png';
import logoUltimate from '../../img/ultimate.png';

import './style.scss';

export default function Hero(props) {
  return (
    <div className="hero">
      <div className="hero__container">

        <h1>Placeholder Text</h1>

        <div className="hero__content">
          <p>A must if you are any kind of developer or designer. Why not smash it up a bit?</p>
          <p>SmashIpsum gives you all fun, nostalgia, and salt you get from Smash Bros while you pretend to work.</p>
        </div>

        <h2>Featuring every game in the series</h2>

        <div className="hero__content hero__images">
          <div className="hero__image">
            <img className="hero__img" src={logo64} />
          </div>

          <div className="hero__image">
            <img className="hero__img" src={logoMelee} />
          </div>

          <div className="hero__image">
            <img className="hero__img" src={logoBrawl} />
          </div>

          <div className="hero__image">
            <img className="hero__img" src={logoPm} />
          </div>

          <div className="hero__image">
            <img className="hero__img" src={logoWiiu} />
          </div>

          <div className="hero__image">
            <img className="hero__img" src={logoUltimate} />
          </div>
        </div>
      </div>
    </div>
   );
};