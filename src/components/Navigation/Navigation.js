import React, { Component } from 'react';
import { Avatar, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleUserLogout } from './../../actions/users';

import './Navigation.css';

class Navigation extends Component {
  handleClick = (e) => {
  }

  render() {
    const { dispatch, users, collapsed } = this.props;
    const { currentUser } = users;

    return (
      <div className="navigation">
        {!collapsed &&
          <div className="current-user">
            <Avatar src={currentUser.avatarURL}/>
            <span>{currentUser.name}</span>
            <a onClick={() => { dispatch(handleUserLogout()) }}>
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
            <Icon type="home" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="leaderboard">
            <Icon type="dashboard" />
            <span>Leaderboard</span>
          </Menu.Item>
          <Menu.Item key="addQuestion">
            <Icon type="plus-circle-o" />
            <span>Add Question</span>
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
