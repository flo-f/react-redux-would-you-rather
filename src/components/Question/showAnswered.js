import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, Col, Form, Row, Radio, Progress } from 'antd';
import _ from 'lodash';

class AnsweredQuestion extends Component {
  render() {
    const { question, answer } = this.props;
    const loading = _.isEmpty(question);

    const noOfVotes = _.get(question, 'optionOne.votes', []).length + _.get(question, 'optionTwo.votes', []).length;
    const votePercentages = [
      Math.round(100 * _.get(question, 'optionOne.votes', []).length / noOfVotes),
      Math.round(100 * _.get(question, 'optionTwo.votes', []).length / noOfVotes),
    ];
    const chosen = [
      answer === 'optionOne',
      answer === 'optionTwo',
    ];

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
              <Row style={ chosen[0] ? { backgroundColor: 'rgba(0, 0, 0, 0.05)' } : {} }>
                <Col span={8}>
                  <Progress type="circle" percent={votePercentages[0]} width={80} format={percent => `${percent}%`} />
                </Col>
                <Col span={14} offset={2}>
                  { chosen[0] ? <strong>Your vote:</strong> : '' }{ question.optionOne.text }
                </Col>
              </Row>
              <Row style={ chosen[1] ? { backgroundColor: 'rgba(0, 0, 0, 0.05)' } : {} }>
                <Col span={8}>
                  <Progress type="circle" percent={votePercentages[1]} width={80} format={percent => `${percent}%`} />
                </Col>
                <Col span={14} offset={2}>
                  { chosen[1] ? <strong>Your vote:</strong> : '' }{ question.optionTwo.text }
                </Col>
              </Row>
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
