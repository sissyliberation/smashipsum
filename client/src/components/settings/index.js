import React from 'react';
import { Checkbox, InputNumber } from 'antd';

import './style.scss';

export default function Settings(props) {

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  function onNumberChange(value) {
    console.log('changed', value);
  }

  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="settings__content settings__six">
        <div className="settings__instance">
          <div className="settings__instance__title">Smash 64</div>
          <Checkbox onChange={onChange}>Characters</Checkbox>
          <Checkbox onChange={onChange}>Stages</Checkbox>
          <Checkbox onChange={onChange}>Items</Checkbox>
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title">Melee</div>
          <Checkbox onChange={onChange}>Characters</Checkbox>
          <Checkbox onChange={onChange}>Stages</Checkbox>
          <Checkbox onChange={onChange}>Items</Checkbox>
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title">Brawl</div>
          <Checkbox onChange={onChange}>Characters</Checkbox>
          <Checkbox onChange={onChange}>Stages</Checkbox>
          <Checkbox onChange={onChange}>Items</Checkbox>
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title">PM</div>
          <Checkbox onChange={onChange}>Characters</Checkbox>
          <Checkbox onChange={onChange}>Stages</Checkbox>
          <Checkbox onChange={onChange}>Items</Checkbox>
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title">Smash 4</div>
          <Checkbox onChange={onChange}>Characters</Checkbox>
          <Checkbox onChange={onChange}>Stages</Checkbox>
          <Checkbox onChange={onChange}>Items</Checkbox>
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title">Smash Ultimate</div>
          <Checkbox onChange={onChange}>Characters</Checkbox>
          <Checkbox onChange={onChange}>Stages</Checkbox>
          <Checkbox onChange={onChange}>Items</Checkbox>
        </div>
      </div>
      <div className="settings__content settings__five">
        <div className="settings__instance">
          <div className="settings__instance__title">min words / sentence</div>
          <InputNumber min={1} max={10} defaultValue={3} onChange={onNumberChange} />
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title">max words / sentence</div>
          <InputNumber min={1} max={10} defaultValue={3} onChange={onNumberChange} />
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title">min sentences / paragraph</div>
          <InputNumber min={1} max={10} defaultValue={3} onChange={onNumberChange} />
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title">max sentences / paragraph</div>
          <InputNumber min={1} max={10} defaultValue={3} onChange={onNumberChange} />
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title"># of paragraphs</div>
          <InputNumber min={1} max={10} defaultValue={3} onChange={onNumberChange} />
        </div>
      </div>
    </div>
   );
};