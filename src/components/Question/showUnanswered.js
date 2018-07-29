import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, Col, Form, Row, Radio, Progress } from 'antd';
import _ from 'lodash';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class UnansweredQuestion extends Component {
  render() {
    const { question } = this.props;
    const loading = _.isEmpty(question);

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
      <Card loading={ loading } title={`Asked by ${question.createdBy.name}`}>
        <Row>
          <Col span={4}>
            <Avatar
              src={ question.createdBy.avatarURL }
              size="large"
            />
          </Col>
          <Col span={16} offset={2}>
            <div>
              <h3>Would you rather</h3>
              <FormItem>
                <RadioGroup>
                  <Radio style={radioStyle} value={1}>{ question.optionOne.text }</Radio>
                  <Radio style={radioStyle} value={2}>{ question.optionTwo.text }</Radio>
                </RadioGroup>
              </FormItem>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={16} offset={6}>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Submit
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Card>
    );
  }
}

UnansweredQuestion.propTypes = {
  question: PropTypes.object.isRequired,
};

export default UnansweredQuestion;
