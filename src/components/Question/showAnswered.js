import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, Col, Row } from 'antd';
import _ from 'lodash';
import OptionDetail from './answer';

class AnsweredQuestion extends Component {
  render() {
    const { question, answer } = this.props;
    const loading = _.isEmpty(question);
    const noOfVotes = _.get(question, 'optionOne.votes', []).length + _.get(question, 'optionTwo.votes', []).length;

    return (
      <Card loading={ loading } title={`${ question.createdBy.name } asks:`}>
        <Row>
          <Col span={4}>
            <Avatar
              src={ question.createdBy.avatarURL }
              size="large"
            />
          </Col>
          <Col span={16} offset={2}>
            <div>
              <h3>Results</h3>
              <OptionDetail
                option={ question.optionOne }
                chosen={ answer === 'optionOne' }
                totalVotes={ noOfVotes }
              />
              <OptionDetail
                option={ question.optionTwo }
                chosen={ answer === 'optionTwo' }
                totalVotes={ noOfVotes }
              />
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

AnsweredQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  answer: PropTypes.string.isRequired,
};

export default AnsweredQuestion;
