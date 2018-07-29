import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import AnsweredQuestion from './showAnswered';
import UnansweredQuestion from './showUnanswered';

class Question extends Component {
  render() {
    const { question, answer } = this.props;

    if (!_.isEmpty(answer)) {
      return <AnsweredQuestion question={ question } anwer={ answer }/>
    }
    return <UnansweredQuestion question={ question }/>;
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  answer: PropTypes.string,
};

export default Question;
