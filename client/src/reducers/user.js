const INITIAL_STATE = {
  loading: false,
  userId: '',
  username: '',
  picture: '',
  karma: 0,
  isLoggedIn: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN_USER':
    return { ...state, isLoggedIn: action.payload };
  case 'INITIAL_STATE_LOADING':
    return { ...state, loading: action.payload };
  case 'LOAD_USER_INFO':
    return { ...state, ...action.payload };
  default:
    return state;
  }
};
