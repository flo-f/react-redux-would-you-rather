import {
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
} from '../actions/questions';
import _ from 'lodash';

const initialState = {
  questions: {},
  error: false,
  loading: false,
};

export default function questions(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS_REQUEST:
      return { ...state, loading: true, error: false };
    case GET_QUESTIONS_SUCCESS:
      const { questions, users } = action.payload;

      const aggregatedQuestions = _.reduce(questions,
        (obj, question) => {
          const author = _.get(users, `users['${question.author}']`, {});
          obj[question.id] = _.assign(
            {},
            question,
            { createdBy: _.pick(author, ['id', 'name', 'avatarURL']) },
          );
          return obj;
        }, {});
      return { ...state, loading: false, error: false, questions: aggregatedQuestions };
    case GET_QUESTIONS_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}
