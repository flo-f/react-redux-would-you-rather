import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
import Navigation from './Navigation/index';
import LoginForm from './LoginForm/form';
import QuestionsOverview from './QuestionsOverview';
import QuestionDetail from './QuestionDetail';
import Leaderboard from './Leaderboard/list';
import AddQuestion from './AddQuestion';
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
    const loggedIn = currentUser && currentUser.id;

    return (
      <Layout className="layout">
        { loggedIn &&
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
            { loggedIn &&
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            }
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              { !loggedIn &&
                <LoginForm/>
              }
              { loggedIn &&
                <Route exact path="/" render={() => (
                  <QuestionsOverview />
                )}/>
              }
              { loggedIn &&
                <Route exact path="/questions/:question_id" render={(props) => (
                  <QuestionDetail {...props} />
                )}/>
              }
              { loggedIn &&
                <Route path="/leaderboard" render={() => (
                  <Leaderboard />
                )}/>
              }
              { loggedIn &&
                <Route path="/add" render={() => (
                  <AddQuestion />
                )}/>
              }
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
  questions: PropTypes.object.isRequired,
};

export default withRouter(connect((state) => ({
  users: state.users,
  questions: state.questions,
}))(App));
