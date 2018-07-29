import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Navigation from './Navigation/Navigation';
import LoginForm from './LoginForm/LoginForm';
import './App.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  onUserLogin = () => {
    console.log('APP: user selected');
  };

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Navigation />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <LoginForm onUserLogin={this.onUserLogin} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <p>
            <span>Ant Design ©2016 Created by Ant UED</span><br />
            <span><a href='https://www.freepik.com/free-vector/people-avatars_763049.htm'>Icons designed by Freepik</a></span>
          </p>
        </Footer>
      </Layout>
    );
  }
}

App.propTypes = {
  users: PropTypes.object.isRequired,
};

export default connect((state) => ({
  users: state.users,
}))(App);
