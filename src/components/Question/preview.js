import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Avatar, Button, Card, Col, Row } from 'antd';

class QuestionPreview extends Component {
  render() {
    const { question } = this.props;
    const { loading } = question;

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
            ...{ question.optionOne.text.substring(0, 20) }...
          </Col>
        </Row>
        <Row>
          <Col span={16} offset={6}>
            <Link to={ `/questions/${question.id}` }>
              <Button
                ghost={ true }
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={ loading }
              >
                View Poll
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    );
  }
}

QuestionPreview.propTypes = {
  question: PropTypes.object.isRequired,
};

export default QuestionPreview;
