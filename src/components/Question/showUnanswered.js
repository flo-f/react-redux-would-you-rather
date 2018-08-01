import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, Col, Form, Row, Radio } from 'antd';
import _ from 'lodash';
import { handleSaveQuestionAnswer } from '../../actions/questions';
import { connect } from 'react-redux';

class UnansweredQuestionForm extends Component {
  handleSubmit = (e) => {
    const {
      dispatch,
      form,
      question,
    } = this.props;

    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const answer = values.answer;
        dispatch(handleSaveQuestionAnswer(question.id, answer));
      }
    });
  };
  render() {
    const { question, form } = this.props;
    const loading = _.isEmpty(question);
    const { getFieldDecorator } = form;

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
      <Card loading={ loading } title={`Asked by ${question.createdBy.name}`}>
        <Form layout="inline" onSubmit={ this.handleSubmit }>
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
                <Form.Item>
                  { getFieldDecorator('answer', {
                    rules: [
                      { required: true, message: 'Please pick an answer' },
                    ],
                  })(
                    <Radio.Group>
                      <Radio style={radioStyle} value="optionOne">{ question.optionOne.text }</Radio>
                      <Radio style={radioStyle} value="optionTwo">{ question.optionTwo.text }</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={16} offset={6}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}

UnansweredQuestionForm.propTypes = {
  question: PropTypes.object.isRequired,
};

const WrappedUnansweredQuestion = Form.create()(UnansweredQuestionForm);

export default connect((state) => ({

}))(WrappedUnansweredQuestion);
