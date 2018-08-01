import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Input, Divider, Button, Row, Col, message } from 'antd';
import { handleSaveQuestion } from '../../actions/questions';

class AddQuestionForm extends Component {
  handleSubmit = (e) => {
    const { dispatch, form, history } = this.props;

    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        message.error('Please validate your input');
      } else {
        dispatch(handleSaveQuestion({
          optionOneText: values.optionOne,
          optionTwoText: values.optionTwo,
        }, history));
      }

    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const loading = false;

    return (
      <Form
        onSubmit={this.handleSubmit}
        className="add-question-form"
      >
        <h2>Create New Question</h2>
        <p>Complete the question:</p>

        <h4>Would you rather ...</h4>
        <Row>
          <Col>
            <Form.Item
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('optionOne', {
                rules: [
                  { required: true, message: 'Please enter an option' },
                ],
              })(
                <Input placeholder="Option One" />
              )}
            </Form.Item>
          </Col>
          <Col>
            <Divider>OR</Divider>
          </Col>
          <Col>
            <Form.Item
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('optionTwo', {
                rules: [
                  { required: true, message: 'Please enter an option' },
                ],
              })(
                <Input placeholder="Option Two" />
              )}
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="create-question-form-button"
                loading={ loading }
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

AddQuestionForm.propTypes = {
  questions: PropTypes.object.isRequired,
};

const WrappedAddQuestionForm = Form.create()(AddQuestionForm);

export default withRouter(connect((state) => ({
  questions: state.questions,
}))(WrappedAddQuestionForm));
