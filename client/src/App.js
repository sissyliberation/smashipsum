import React from 'react';
import './app.scss';
import axios from 'axios';
import { Layout } from 'antd';
import Settings  from './components/settings';
import Ipsum  from './components/ipsum';

const { Header, Footer, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ipsum: null,
      minWords:       5,
      maxWords:       15,
      minSentences:   3,
      maxSentences:   7,
      numParagraphs:  4,
      format:         'text',
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
    };
  }

  getData = () => {
    if (this.state) {
      const settings = {
        numParagraphs:  this.state.numParagraphs,
        minWords:       this.state.minWords,
        maxWords:       this.state.maxWords,
        minSentences:   this.state.minSentences,
        maxSentences:   this.state.maxSentences,
        format:         this.state.format,
        smash64: this.state.smash64,
        melee: this.state.melee,
        brawl: this.state.brawl,
        pm: this.state.pm,
        smash4: this.state.smash4
      };

      axios.get('/api/ipsum', {
        params: settings
      })
      .then(res => {
        let { ipsum } = res.data;

        this.setState({
          ipsum: ipsum
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
      [instance]: {
        ...this.state[instance],
        [name]: checked
      }
    })
  }

  onSelectChange = (name) => (value) => {
    this.setState({
      [name]: value
    })
  }

  onNumberChange = (name) => (value) => {
    this.setState({
      [name]: value
    })
  }

  componentDidMount() {
    console.log('mount');
    this.getData();
  }

  render() {
    return (
      <Layout>
        <Header>header</Header>
        <Content>
          <Settings {...this.state}
            onCheckboxCheck={this.onCheckboxCheck}
            onNumberChange={this.onNumberChange}
            onSelectChange={this.onSelectChange} />

          <Ipsum ipsum={this.state.ipsum} getData={this.getData} />
        </Content>
        <Footer>
          <div className="container">
            // Created in ATX by <a href="https://novacourtois.github.io" target="_blank" rel="noopener noreferrer">Nova Skye</a>
          </div>
        </Footer>
      </Layout>
    );
  }
}

export default App;