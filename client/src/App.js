import React, { useContext, useState} from 'react';
import ReactGA from 'react-ga';
import axios from 'axios';
import cookie from 'react-cookies'
import { Layout } from 'antd';

import Header from './components/header';
import Hero from './components/hero';
import Footer from './components/footer';
import Settings from './components/settings';
import Ipsum from './components/ipsum';
import CookieBanner from './components/cookie-banner';
import { ThemeProvider } from './ThemeContext';
import { CookieProvider } from './CookieContext';
import './app.scss';

import {initialSettings} from './data';

const { Content } = Layout;

export default function App(props) {
  const [settings, setSettings] = useState(initialSettings);
  const [ipsum, setIpsum] = useState(null);

  let ipsumCopied = false;
  let displayCookieBanner = true;
  let displayCookieExplanation = false;

  const setCookies = () => {
    const settings = JSON.stringify(this.state.settings);
    cookie.save('smashipsum__settings', settings, { path: '/' })
  }

  const getData = () => {
    if (this.state) {
      const settings = {
        numParagraphs:  this.state.settings.numParagraphs,
        minWords:       this.state.settings.minWords,
        maxWords:       this.state.settings.maxWords,
        minSentences:   this.state.settings.minSentences,
        maxSentences:   this.state.settings.maxSentences,
        format:         this.state.settings.format,
        smash64:        this.state.settings.smash64,
        melee:          this.state.settings.melee,
        brawl:          this.state.settings.brawl,
        pm:             this.state.settings.pm,
        smash4:         this.state.settings.smash4,
        ultimate:       this.state.settings.ultimate
      };

      axios.get('/api/ipsum', {
        params: settings
      })
      .then(res => {
        let { ipsum } = res.data;

        this.setState({
          ipsum: ipsum,
          ipsumCopied: false,
        }, () => {
          ReactGA.event({
            category: 'Ipsum',
            action: 'Generate Text'
          });
        })
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  const onCheckboxCheck = (e) => {
    let { instance, name, checked } = e.target;

    this.setState({
      settings: {
        ...this.state.settings,
        [instance]: {
          ...this.state.settings[instance],
          [name]: checked
        }
      }
    }, () => {
      this.setCookies();
    })
  }

  const onSelectChange = (name) => (value) => {
    this.setState({
      settings: {
        ...this.state.settings,
        [name]: value
      }
    }, () => {
      this.setCookies();
    })
  }

  const onNumberChange = (name) => (value) => {
    this.setState({
      settings: {
        ...this.state.settings,
        [name]: value
      }
    }, () => {
      this.setCookies();
    })
  }

  const onCookieBannerSelection = useCookies => (e) => {
    console.log(e);
    e.preventDefault();

    this.setState({
      displayCookieBanner: false
    }, () => {
      cookie.save('smashipsum__cookie-consent', useCookies, { path: '/' });
      ReactGA.event({
        category: 'Cookie Consent',
        action: 'Click Okay'
      });
    })
  };

  const onCookieExplanation = (event) => {
    event.preventDefault();

    this.setState({
      displayCookieExplanation: true
    }, () => {
      ReactGA.event({
        category: 'Cookie Explanation',
        action: 'View Explanation'
      });
    })
  };

  const onAnchorScroll = field => (event) => {
    event.preventDefault();

    document.getElementById(field).scrollIntoView({behavior:"smooth", block: "start"});
  }

  // toggleDarkMode = () => {
  //   this.setState({
  //     darkMode: !this.state.darkMode
  //   }, () => {
  //     cookie.save('smashipsum__darkmode', this.state.darkMode, { path: '/' });
  //   })
  // }

  const copyData = (e) => {
    e.preventDefault();

    navigator.clipboard.writeText(this.state.ipsum);

    this.setState({
      ipsumCopied: true,
    })
  };

  // componentDidMount() {
  //   const cookieConsent = cookie.load('smashipsum__cookie-consent');
  //   const settingsCookieValue = cookie.load('smashipsum__settings');
  //   const darkModeCookieValue = cookie.load('smashipsum__darkmode');
  //
  //   if (cookieConsent === 'true' && (settingsCookieValue || darkModeCookieValue)) {
  //     this.setState({
  //       settings: settingsCookieValue,
  //       darkMode: darkModeCookieValue === 'true',
  //     },() => {
  //       this.getData();
  //     })
  //   }
  //   else {
  //     this.getData();
  //   }
  //
  //   this.setState({
  //     displayCookieBanner: cookieConsent === undefined
  //   })
  //
  //   ReactGA.initialize('UA-113771362-1');
  //   ReactGA.pageview('/');
  // }

  return (
    <>
    <CookieProvider>
      <ThemeProvider>
        <Layout>
          {
            // this.state.displayCookieBanner && (
            // <CookieBanner
            //   displayCookieExplanation={this.state.displayCookieExplanation}
            //   onCookieBannerSelection={this.onCookieBannerSelection}
            //   onCookieExplanation={this.onCookieExplanation} />
            // )
          }

          <Header onAnchorScroll={onAnchorScroll}/>
          <Content>
            <Hero />

            <Settings settings={settings}
              onCheckboxCheck={onCheckboxCheck}
              onNumberChange={onNumberChange}
              onSelectChange={onSelectChange}/>

            <Ipsum ipsum={ipsum}
              getData={getData}
              copyData={copyData}
              ipsumCopied={ipsumCopied}/>

          </Content>
          <Footer />
        </Layout>
      </ThemeProvider>
    </CookieProvider>
    </>
  );
}
