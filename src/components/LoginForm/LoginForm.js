import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Select, Button, Row, Col } from 'antd';
import { handleGetUsers, handleUserLogin } from '../../actions/users';
import './LoginForm.css';
import { message } from 'antd/lib/index';

class LoginForm extends Component {
  componentDidMount = () => {
    const { dispatch } = this.props;

    dispatch(handleGetUsers());
  };

  handleSubmit = (e) => {
    const { dispatch, form, users } = this.props;

    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        message.error('Please validate your input');
      }
      else {
        const user = users.users[values.userId];
        dispatch(handleUserLogin(user));
      }
    });
  };

  render() {
    const { form, users } = this.props;
    const { loading } = users;
    const allUsers = Object.keys(users.users).map((key, index) => users.users[key]);
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Form
        onSubmit={this.handleSubmit}
        className="login-form"
      >
        <Row>
          <Col span={16} offset={4}>
            <Form.Item
              {...formItemLayout}
              label="User"
              hasFeedback
            >
              {getFieldDecorator('userId', {
                rules: [
                  { required: true, message: 'Please select a user' },
                ],
              })(
                <Select placeholder={ loading ? "Loading..." : "Please choose a user" }>
                  { allUsers.map(user => <Select.Option key={user.id}>{user.name}</Select.Option>) }
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={11} offset={6}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={ loading }
              >
                Log in
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  users: PropTypes.object.isRequired,
};

const WrappedLoginForm = Form.create()(LoginForm);

export default connect((state) => ({
  users: state.users,
}))(WrappedLoginForm);
