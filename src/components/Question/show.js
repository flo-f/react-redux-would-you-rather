import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, Col, Form, Row, Radio, Input } from 'antd';

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
    const { question } = this.props;

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

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
            <h3>Would you rather...</h3>
            <FormItem>
              <RadioGroup onChange={ this.onChange } value={ this.state.value }>
                <Radio style={radioStyle} value={1}>{ question.optionOne.text }</Radio>
                <Radio style={radioStyle} value={2}>{ question.optionTwo.text }</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={16} offset={6}>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={ loading }
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

Question.propTypes = {
  question: PropTypes.object.isRequired,
};

export default Question;
