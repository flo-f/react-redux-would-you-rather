import * as API from '../_DATA';

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
  return (dispatch) => {
    dispatch(getQuestionsRequest());
    return API._getQuestions()
      .then((users) => {
        dispatch(getQuestionsSuccess(users))
      })
      .catch(() => {
        dispatch(getQuestionsError());
      });
  };
}
