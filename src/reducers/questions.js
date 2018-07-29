import {
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
} from '../actions/questions';

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
      return { ...state, loading: false, error: false, questions: action.payload };
    case GET_QUESTIONS_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}
