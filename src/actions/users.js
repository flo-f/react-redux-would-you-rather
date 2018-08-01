import * as API from '../_DATA';

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';

function getUsersRequest() {
  return {
    type: GET_USERS_REQUEST,
  }
}

function getUsersSuccess(payload) {
  return {
    type: GET_USERS_SUCCESS,
    payload,
  }
}

function getUsersError() {
  return {
    type: GET_USERS_ERROR,
  }
}

export function handleGetUsers() {
  return (dispatch) => {
    dispatch(getUsersRequest());
    return API._getUsers()
      .then((users) => {
        dispatch(getUsersSuccess(users))
      })
      .catch(() => {
        dispatch(getUsersError());
      });
  };
}


export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

function userLogin(payload) {
  return {
    type: USER_LOGIN,
    payload,
  }
}

export function handleUserLogin(user) {
  return (dispatch) => {
    dispatch(userLogin(user));
  }
}

function userLogout() {
  return {
    type: USER_LOGOUT,
  }
}

export function handleUserLogout() {
  return (dispatch) => {
    dispatch(userLogout());
  }
}
