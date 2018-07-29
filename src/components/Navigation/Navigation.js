import React, { Component } from 'react';
import { Menu } from 'antd';

class Navigation extends Component {
  render() {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="home">Home</Menu.Item>
        <Menu.Item key="leaderboard">Leaderboard</Menu.Item>
        <Menu.Item key="addQuestion">Add Question</Menu.Item>
      </Menu>
    );
  }
}

export default Navigation;
