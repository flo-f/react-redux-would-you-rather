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

// save question answer

export const SAVE_QUESTION_ANSWER_REQUEST = 'SAVE_QUESTION_ANSWER_REQUEST';
export const SAVE_QUESTION_ANSWER_SUCCESS = 'SAVE_QUESTION_ANSWER_SUCCESS';
export const SAVE_QUESTION_ANSWER_ERROR = 'SAVE_QUESTION_ANSWER_ERROR';

function saveQuestionAnswerRequest() {
  return {
    type: SAVE_QUESTION_ANSWER_REQUEST,
  }
}

function saveQuestionAnswerSuccess(payload) {
  return {
    type: SAVE_QUESTION_ANSWER_SUCCESS,
    payload,
  }
}

function saveQuestionAnswerError() {
  return {
    type: SAVE_QUESTION_ANSWER_ERROR,
  }
}

export function handleSaveQuestionAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { users } = getState();
    const { currentUser } = users;

    dispatch(saveQuestionAnswerRequest());
    return API._saveQuestionAnswer({
      authedUser: currentUser.id,
      qid,
      answer
    })
      .then(() => {
        dispatch(saveQuestionAnswerSuccess({ qid, answer, currentUserId: currentUser.id }));
      })
      .catch(() => {
        dispatch(saveQuestionAnswerError());
      });
  };
}


// create question

export const SAVE_QUESTION_REQUEST = 'SAVE_QUESTION_REQUEST';
export const SAVE_QUESTION_SUCCESS = 'SAVE_QUESTION_SUCCESS';
export const SAVE_QUESTION_ERROR = 'SAVE_QUESTION_ERROR';

function saveQuestionRequest() {
  return {
    type: SAVE_QUESTION_REQUEST,
  }
}

function saveQuestionSuccess(payload) {
  return {
    type: SAVE_QUESTION_SUCCESS,
    payload,
  }
}

function saveQuestionError(payload) {
  return {
    type: SAVE_QUESTION_ERROR,
    payload,
  }
}

export function handleSaveQuestion({ optionOneText, optionTwoText }, history) {
  return (dispatch, getState) => {
    const { users } = getState();
    const { currentUser } = users;

    dispatch(saveQuestionRequest());
    return API._saveQuestion({
      author: currentUser.id,
      optionOneText,
      optionTwoText,
    })
      .then((question) => {
        dispatch(saveQuestionSuccess({ question, users: users.users }));
        history.push('/');
      })
      .catch((err) => {
        dispatch(saveQuestionError(err));
      });
  };
}
