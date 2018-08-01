import _ from 'lodash';
import {
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  SAVE_QUESTION_ANSWER_REQUEST,
  SAVE_QUESTION_ANSWER_SUCCESS,
  SAVE_QUESTION_ANSWER_ERROR,
  SAVE_QUESTION_ERROR,
  SAVE_QUESTION_REQUEST,
  SAVE_QUESTION_SUCCESS,
} from '../actions/questions';

const initialState = {
  questions: {},
  error: false,
  loading: false,
};

function aggregateQuestions(questions, users) {
  return _.reduce(questions,
    (obj, question) => {
      const author = _.get(users, `users['${question.author}']`, {});
      obj[question.id] = _.assign(
        {},
        question,
        { createdBy: _.pick(author, ['id', 'name', 'avatarURL']) },
      );
      return obj;
    }, {});
}

export default function questions(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS_REQUEST:
      return { ...state, loading: true, error: false };
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        questions: aggregateQuestions(action.payload.questions, action.payload.users),
      };
    case GET_QUESTIONS_ERROR:
      return { ...state, loading: false, error: true };
    case SAVE_QUESTION_ANSWER_REQUEST:
      return { ...state, loading: true, error: false };
    case SAVE_QUESTION_ANSWER_SUCCESS:
      const { qid, answer, currentUserId } = action.payload;

      return {
        ...state,
        questions: {
          ...state.questions,
          [qid]: {
            ...state.questions[qid],
            [answer]: {
              ...state.questions[qid][answer],
              votes: state.questions[qid][answer].votes.concat([currentUserId])
            }
          }
        },
        loading: false,
        error: false,
      };
    case SAVE_QUESTION_ERROR:
      return { ...state, loading: false, error: true };
    case SAVE_QUESTION_REQUEST:
      return { ...state, loading: true, error: false };
    case SAVE_QUESTION_SUCCESS:
      const { question, users } = action.payload;

      const newQuestions = aggregateQuestions({
        ...state.questions,
        [question.id]: question
      }, users);
      return {
        ...state,
        questions: newQuestions,
        loading: false,
        error: false,
      };
    case SAVE_QUESTION_ANSWER_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}
