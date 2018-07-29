import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import _ from 'lodash';
import Questions from '../Question/list';
import { handleGetQuestions } from '../../actions/questions';

const TabPane = Tabs.TabPane;


class QuestionsOverview extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(handleGetQuestions());
  }

  render() {
    const { questions, users } = this.props;
    const { loading: loadingQuestions } = questions;
    const { loading: loadingUsers } = users;
    const loading = loadingQuestions || loadingUsers;
    const answeredIds = Object.keys(_.get(users, 'currentUser.answers', {}));

    const answered = _.chain(questions.questions)
      .filter(question => _.includes(answeredIds, question.id))
      .map(question => ({ ...question, createdBy: _.get(users, `users['${question.author}']`, {}) }))
      .value();
    const unanswered = _.chain(questions.questions)
      .filter(question => !_.includes(answeredIds, question.id))
      .map(question => ({ ...question, createdBy: _.get(users, `users['${question.author}']`, {}) }))
      .value();

    return (
      <Tabs defaultActiveKey="1" onChange={ this.callback }>
        <TabPane tab="Unanswered Questions" key="unanswered">
          <Questions loading={ loading } questions={ unanswered } />
        </TabPane>
        <TabPane tab="Answered Questions" key="answered">
          <Questions loading={ loading } questions={ answered } />
        </TabPane>
      </Tabs>
    );
  }
}

QuestionsOverview.propTypes = {
  questions: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

export default connect((state) => ({
  questions: state.questions,
  users: state.users,
}))(QuestionsOverview);
