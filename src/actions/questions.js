import _ from 'lodash';
import * as API from '../_DATA';

// get all questions

export const GET_QUESTIONS_REQUEST = 'GET_QUESTIONS_REQUEST';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';

function getQuestionsRequest() {
  return {
    type: GET_QUESTIONS_REQUEST,
  }
}

function getQuestionsSuccess(payload) {
  return {
    type: GET_QUESTIONS_SUCCESS,
    payload,
  }
}

function getQuestionsError() {
  return {
    type: GET_QUESTIONS_ERROR,
  }
}

export function handleGetQuestions() {
  return (dispatch, getState) => {
    const { questions, users } = getState();

    if (_.isEmpty(_.get(questions, 'questions'))) {
      dispatch(getQuestionsRequest());
      return API._getQuestions()
        .then((questions) => {
          dispatch(getQuestionsSuccess({ questions, users }))
        })
        .catch(() => {
          dispatch(getQuestionsError());
        });
    }
    return dispatch(getQuestionsSuccess({ questions: questions.questions, users }));
  };
}
