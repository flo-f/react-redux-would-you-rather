import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import Question from '../Question/show';
import { handleGetQuestions } from '../../actions/questions';


class QuestionDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(handleGetQuestions());
  }

  render() {
    const { match, questions, users } = this.props;

    const id = match.params.question_id;
    const { loading } = questions;
    const question = questions.questions[id];
    const answer = users.currentUser.answers[id];

    if (loading) {
      return <Spin />;
    }
    if (question) {
      return <Question
        question={ question }
        answer={ answer }
      />;
    }
    return <p>ERROR: Cannot find such question</p>;
  }
}

QuestionDetail.propTypes = {
  questions: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

export default connect((state) => ({
  questions: state.questions,
  users: state.users,
}))(QuestionDetail);
