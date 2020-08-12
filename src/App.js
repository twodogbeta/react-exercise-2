import React, { Component } from 'react';
import './App.scss';
import { Layout, message, Skeleton } from 'antd';
import 'antd/dist/antd.css';
import MyHeader from './compnents/header/my-header';
import Category from './compnents/item/category';
import axios from 'axios';

const { Header, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchData();
  }

  state = {
    isLoaded: false,
    cartList: [],
    data: {},
  };

  fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      if (response.status === 200) {
        let i = 0;
        response.data.forEach((o) => {
          if (
            !Object.prototype.hasOwnProperty.call(this.state.data, o.category)
          ) {
            this.state.data[o.category] = [];
          }
          this.state.data[o.category].push({
            name: o.name,
            price: o.price,
            key: i,
          });
          this.setState({
            isLoaded: true,
          });
          i++;
        });
      } else {
        message.error('数据获取错误');
      }
    } catch (e) {
      console.log(e);
      message.error('服务器连接失败');
    }
  };
  render() {
    const categories = [];
    for (const [key, value] of Object.entries(this.state.data)) {
      categories.push(<Category name={key} list={value} />);
    }
    console.log(categories);
    if (!this.state.isLoaded) {
      return (
        <main className="app">
          <Header style={{ background: '#416aff' }}>
            <MyHeader />
          </Header>
          <Content>
            <Skeleton active />
          </Content>
        </main>
      );
    } else {
      return (
        <main className="app">
          <Header style={{ background: '#416aff' }}>
            <MyHeader />
          </Header>
          <Content>{categories}</Content>
        </main>
      );
    }
  }
}

export default App;
