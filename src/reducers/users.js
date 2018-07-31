import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  USER_LOGIN,
  USER_LOGOUT,
} from '../actions/users';
import {
  SAVE_QUESTION_ANSWER_SUCCESS
} from '../actions/questions';

const initialState = {
  users: {},
  currentUser: {},
  error: false,
  loading: false,
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { ...state, loading: true, error: false };
    case GET_USERS_SUCCESS:
      return { ...state, loading: false, error: false, users: action.payload };
    case GET_USERS_ERROR:
      return { ...state, loading: false, error: true };
    case USER_LOGIN:
      return { ...state, currentUser: action.payload };
    case USER_LOGOUT:
      return { ...state, currentUser: {} };
    case SAVE_QUESTION_ANSWER_SUCCESS:
      const { qid, answer, currentUserId } = action.payload;
      const currentUser = {
        ...state.users[currentUserId],
        answers: {
          ...state.users[currentUserId].answers,
          [qid]: answer
        }
      };

      return {
        ...state,
        users: {
          ...state.users,
          [currentUserId]: currentUser
        },
        currentUser,
      };
    default:
      return state;
  }
}
