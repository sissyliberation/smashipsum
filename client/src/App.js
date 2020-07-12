import React from 'react';
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
import './app.scss';

const { Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ipsum: null,
      settings: {
        minWords:       5,
        maxWords:       15,
        minSentences:   3,
        maxSentences:   7,
        numParagraphs:  4,
        format:         'plain',
        smash64:  {
          characters: true,
          stages:     true,
          items:      true,
        },
        melee:  {
          characters: true,
          stages:     true,
          items:      true,
        },
        brawl:  {
          characters: true,
          stages:     true,
          items:      true,
        },
        pm:  {
          characters: true,
          stages:     true,
          items:      true,
        },
        smash4:  {
          characters: true,
          stages:     true,
          items:      true,
        },
        ultimate: {
          characters: true,
          stages:     true,
          items:      true,
        }
      },
      displayCookieBanner: true,
      displayCookieExplanation: false,
      darkMode: true,
      ipsumCopied: false,
    };
  }

  setCookies = () => {
    const settings = JSON.stringify(this.state.settings);
    cookie.save('smashipsum__settings', settings, { path: '/' })
  }

  getData = () => {
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

  onCheckboxCheck = (e) => {
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

  onSelectChange = (name) => (value) => {
    this.setState({
      settings: {
        ...this.state.settings,
        [name]: value
      }
    }, () => {
      this.setCookies();
    })
  }

  onNumberChange = (name) => (value) => {
    this.setState({
      settings: {
        ...this.state.settings,
        [name]: value
      }
    }, () => {
      this.setCookies();
    })
  }

  onCookieBannerSelection = (event) => {
    event.preventDefault();

    this.setState({
      displayCookieBanner: false
    }, () => {
      cookie.save('smashipsum__cookie-consent', true, { path: '/' });
      ReactGA.event({
        category: 'Cookie Consent',
        action: 'Click Okay'
      });
    })
  }

  onCookieExplanation = (event) => {
    event.preventDefault();

    this.setState({
      displayCookieExplanation: true
    }, () => {
      ReactGA.event({
        category: 'Cookie Explanation',
        action: 'View Explanation'
      });
    })
  }

  onAnchorScroll = field => (event) => {
    event.preventDefault();

    document.getElementById(field).scrollIntoView({behavior:"smooth", block: "start"});
  }

  toggleDarkMode = () => {
    this.setState({
      darkMode: !this.state.darkMode
    }, () => {
      cookie.save('smashipsum__darkmode', this.state.darkMode, { path: '/' });
    })
  }

  copyData = (e) => {
    e.preventDefault();

    navigator.clipboard.writeText(this.state.ipsum);

    this.setState({
      ipsumCopied: true,
    })
  };

  componentDidMount() {
    const cookieConsent = cookie.load('smashipsum__cookie-consent');
    const settingsCookieValue = cookie.load('smashipsum__settings');
    const darkModeCookieValue = cookie.load('smashipsum__darkmode');

    if (cookieConsent === 'true' && (settingsCookieValue || darkModeCookieValue)) {
      this.setState({
        settings: settingsCookieValue,
        darkMode: darkModeCookieValue === 'true',
      },() => {
        this.getData();
      })
    }
    else {
      this.getData();
    }

    this.setState({
      displayCookieBanner: cookieConsent === undefined
    })

    ReactGA.initialize('UA-113771362-1');
    ReactGA.pageview('/');
  }

  render() {
    return (
      <Layout className={this.state.darkMode ? '' : 'lite-mode'}>
        { this.state.displayCookieBanner && (
          <CookieBanner
            displayCookieExplanation={this.state.displayCookieExplanation}
            onCookieBannerSelection={this.onCookieBannerSelection}
            onCookieExplanation={this.onCookieExplanation} />
        )}

        <Header onAnchorScroll={this.onAnchorScroll} toggleDarkMode={this.toggleDarkMode} darkMode={this.state.darkMode} />
        <Content>
          <Hero />

          <Settings settings={this.state.settings}
            onCheckboxCheck={this.onCheckboxCheck}
            onNumberChange={this.onNumberChange}
            onSelectChange={this.onSelectChange}/>

          <Ipsum ipsum={this.state.ipsum}
            getData={this.getData}
            copyData={this.copyData}
            ipsumCopied={this.state.ipsumCopied}/>
        </Content>
        <Footer />

      </Layout>
    );
  }
}

export default App;
