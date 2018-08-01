import React, { Component } from 'react';
import { Avatar, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleUserLogout } from './../../actions/users';

import './index.css';

class Navigation extends Component {
  render() {
    const { dispatch, users, collapsed } = this.props;
    const { currentUser } = users;

    return (
      <div className="navigation">
        {!collapsed &&
          <div className="current-user">
            <Avatar src={currentUser.avatarURL}/>
            <span className="name">{currentUser.name}</span>
            <a
              className="logout"
              onClick={() => { dispatch(handleUserLogout()) }}
            >
              <Icon type="logout"/>
            </a>
          </div>
        }
        <Menu
          onClick={this.handleClick}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}>
          <Menu.Item key="home">
            <span>
              <Link to="/" className="nav-text">
                <Icon type="home" />
                Home
              </Link>
            </span>
          </Menu.Item>
          <Menu.Item key="leaderboard">
            <span>
              <Link to="/leaderboard" className="nav-text">
                <Icon type="dashboard" />
                Leaderboard
              </Link>
            </span>
          </Menu.Item>
          <Menu.Item key="addQuestion">
            <span>
              <Link to="/add" className="nav-text">
                <Icon type="plus-circle-o" />
                Add Question
              </Link>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

Navigation.propTypes = {
  users: PropTypes.object.isRequired,
  collapsed: PropTypes.bool,
};

export default connect((state) => ({
  users: state.users,
}))(Navigation);
