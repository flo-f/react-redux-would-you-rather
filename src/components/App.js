import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
import Navigation from './Navigation/Navigation';
import LoginForm from './LoginForm/LoginForm';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { users } = this.props;
    const { currentUser } = users;

    return (
      <Layout className="layout">
        { currentUser && currentUser.id &&
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <Navigation collapsed={this.state.collapsed}/>
          </Sider>
        }
        <Layout className="innerLayout">
          <Header style={{ background: '#fff', padding: 0 }}>
            { currentUser && currentUser.id &&
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            }
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <LoginForm />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <p>
              <span>Ant Design ©2016 Created by Ant UED</span><br />
              <span><a href='https://www.freepik.com/free-vector/people-avatars_763049.htm'>Icons designed by Freepik</a></span>
            </p>
          </Footer>
        </Layout>
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