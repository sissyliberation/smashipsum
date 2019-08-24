import React from 'react';
import './app.scss';

import { Layout } from 'antd';
import Settings  from './components/settings';

const { Header, Footer, Content } = Layout;



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <Layout>
        <Header>header</Header>
        <Content>
          <Settings {...this.state} />
        </Content>
        <Footer>footer</Footer>
      </Layout>
    );
  }
}

export default App;