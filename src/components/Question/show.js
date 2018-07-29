import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, Col, Form, Row, Radio, Progress } from 'antd';
import _ from 'lodash';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class Question extends Component {
  state = {
    loading: false,
  };

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { loading } = this.state;
    const { question, answer } = this.props;

    const answered = !_.isEmpty(answer);

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const title = answered ? `Asked by ${question.createdBy.name}` : `${ question.createdBy.name } asks:`;
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
      <Card loading={ loading } title={title}>
        <Row>
          <Col span={4}>
            <Avatar
              src={ question.createdBy.avatarURL }
              size="large"
            />
          </Col>
          <Col span={16} offset={2}>
            { answered &&
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
            }
            { !answered &&
              <div>
                <h3>Would you rather</h3>
                <FormItem>
                  <RadioGroup onChange={ this.onChange } value={ this.state.value }>
                    <Radio style={radioStyle} value={1}>{ question.optionOne.text }</Radio>
                    <Radio style={radioStyle} value={2}>{ question.optionTwo.text }</Radio>
                  </RadioGroup>
                </FormItem>
              </div>
            }
          </Col>
        </Row>
        {!answered &&
          <Row>
            <Col span={16} offset={6}>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={loading}
                >
                  Submit
                </Button>
              </FormItem>
            </Col>
          </Row>
        }
      </Card>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  answer: PropTypes.string,
};

export default Question;
