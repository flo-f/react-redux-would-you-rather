import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form } from 'antd';

class AddQuestion extends Component {
  render() {

    return (
      <p>TODO: Add Question</p>
    );
  }
}

AddQuestion.propTypes = {

};

const WrappedAddQuestion = Form.create()(AddQuestion);

export default connect((state) => ({

}))(WrappedAddQuestion);
