import React, { Component } from 'react';
import './App.scss';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import MyHeader from './compnents/header/my-header';

const { Header } = Layout;

class App extends Component {
  render() {
    return (
      <main className="app">
        <Header theme={'light'} style={{ background: '#416aff' }}>
          <MyHeader />
        </Header>
      </main>
    );
  }
}

export default App;
