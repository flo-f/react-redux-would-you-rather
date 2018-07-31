import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Avatar, Badge, List } from 'antd';

class Leaderboard extends Component {
  render() {
    const { users } = this.props;
    const data = _.chain(users.users)
      .map(user => ({
        ...user,
        rank: Object.keys(_.get(user, 'answers', {})).length + _.get(user, 'questions', []).length,
      }))
      .sortBy(user => -1 * user.rank)
      .value();

    return (
      <List
        itemLayout="horizontal"
        dataSource={ data }
        renderItem={ user => (
          <List.Item>
            <List.Item.Meta
              avatar={ <Avatar src={ user.avatarURL } /> }
              title={ user.name }
              description={
                `${ Object.keys(_.get(user, 'answers', {})).length } created
                /
                ${ _.get(user, 'questions', []).length } answered`
              }
            />
            <Badge count={ user.rank } />
          </List.Item>
        )}
      />
    );
  }
}

Leaderboard.propTypes = {
  users: PropTypes.object.isRequired,
};

export default connect((state) => ({
  users: state.users,
}))(Leaderboard);
