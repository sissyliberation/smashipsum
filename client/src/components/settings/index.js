import React from 'react';
import { Checkbox, InputNumber, Select } from 'antd';
import './style.scss';

const { Option } = Select;

export default function Settings(props) {

  

  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="settings__content settings__content--games">
        <div className="settings__instance">
          <div className="settings__instance__title">64</div>
          <Checkbox instance={"smash64"} name={"characters"} checked={props.smash64.characters} onChange={props.onCheckboxCheck}>Characters</Checkbox>
          <Checkbox instance={"smash64"} name={"stages"} checked={props.smash64.stages} onChange={props.onCheckboxCheck}>Stages</Checkbox>
          <Checkbox instance={"smash64"} name={"items"} checked={props.smash64.items} onChange={props.onCheckboxCheck}>Items</Checkbox>
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title">Melee</div>
          <Checkbox instance={"melee"} name={"characters"} checked={props.melee.characters} onChange={props.onCheckboxCheck}>Characters</Checkbox>
          <Checkbox instance={"melee"} name={"stages"} checked={props.melee.stages} onChange={props.onCheckboxCheck}>Stages</Checkbox>
          <Checkbox instance={"melee"} name={"items"} checked={props.melee.items} onChange={props.onCheckboxCheck}>Items</Checkbox>
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title">Brawl</div>
          <Checkbox instance={"brawl"} name={"characters"} checked={props.brawl.characters} onChange={props.onCheckboxCheck}>Characters</Checkbox>
          <Checkbox instance={"brawl"} name={"stages"} checked={props.brawl.stages} onChange={props.onCheckboxCheck}>Stages</Checkbox>
          <Checkbox instance={"brawl"} name={"items"} checked={props.brawl.items} onChange={props.onCheckboxCheck}>Items</Checkbox>
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title">PM</div>
          <Checkbox instance={"pm"} name={"characters"} checked={props.pm.characters} onChange={props.onCheckboxCheck}>Characters</Checkbox>
          <Checkbox instance={"pm"} name={"stages"} checked={props.pm.stages} onChange={props.onCheckboxCheck}>Stages</Checkbox>
          <Checkbox instance={"pm"} name={"items"} checked={props.pm.items} onChange={props.onCheckboxCheck}>Items</Checkbox>
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title">Sm4sh</div>
          <Checkbox instance={"smash4"} name={"characters"} checked={props.smash4.characters} onChange={props.onCheckboxCheck}>Characters</Checkbox>
          <Checkbox instance={"smash4"} name={"stages"} checked={props.smash4.stages} onChange={props.onCheckboxCheck}>Stages</Checkbox>
          <Checkbox instance={"smash4"} name={"items"} checked={props.smash4.items} onChange={props.onCheckboxCheck}>Items</Checkbox>
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title">Ultimate</div>
          <Checkbox instance={"ultimate"} name={"characters"} checked={props.ultimate.characters} onChange={props.onCheckboxCheck}>Characters</Checkbox>
          <Checkbox instance={"ultimate"} name={"stages"} checked={props.ultimate.stages} onChange={props.onCheckboxCheck}>Stages</Checkbox>
          <Checkbox instance={"ultimate"} name={"items"} checked={props.ultimate.items} onChange={props.onCheckboxCheck}>Items</Checkbox>
        </div>
      </div>
      <div className="settings__content settings__content--general">
        <div className="settings__instance">
          <div className="settings__instance__title">min words / sentence</div>
          <InputNumber name={"minWords"} min={1} value={props.minWords} defaultValue={props.minWords} onChange={props.onNumberChange("minWords")} />
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title">max words / sentence</div>
          
          <InputNumber name={"maxWords"} min={1} value={props.maxWords} defaultValue={props.maxWords} onChange={props.onNumberChange("maxWords")} />
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title">min sentences / paragraph</div>
          <InputNumber name={"minSentences"} min={1} value={props.minSentences} defaultValue={props.minSentences} onChange={props.onNumberChange("minSentences")} />
        </div>
        <div className="settings__instance">        
          <div className="settings__instance__title">max sentences / paragraph</div>
          <InputNumber name={"maxSentences"} min={1} value={props.maxSentences} defaultValue={props.maxSentences} onChange={props.onNumberChange("maxSentences")} />
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title"># of paragraphs</div>
          <InputNumber name={"numParagraphs"} min={1} value={props.numParagraphs} defaultValue={props.numParagraphs} onChange={props.onNumberChange("numParagraphs")} />
        </div>
        <div className="settings__instance">
          <div className="settings__instance__title">format</div>
          <Select value={props.format} onChange={props.onSelectChange("format")}>
            <Option value="text">Plain Text</Option>
            <Option value="html">HTML</Option>
          </Select>
        </div>
      </div>
    </div>
   );
};