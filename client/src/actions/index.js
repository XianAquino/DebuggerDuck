import axios from 'axios';

export const checkLoginStatus = (dispatch) => {
  return (dispatch) => {
    axios.get('/api/user/loggedin')
      .then(() => loginStatus(dispatch, true))
      .catch(() => loginStatus(dispatch, false));
  };
};

const loginStatus = (dispatch, success) => {
  dispatch({
    type: 'LOGIN_USER',
    payload: success
  });
};
