import React from 'react';

/* Init state login */
const initialLoginState = {
  isLoading: true,
  userName: null,
  userToken: null,
};

const Login = (prevState = initialLoginState, action) => {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
      break;
    case 'LOGIN':
      return {
        ...prevState,
        userName: action.id,
        userToken: action.token,
        isLoading: false,
      };
      break;
    case 'LOGOUT':
      return {
        ...prevState,
        userName: null,
        userToken: null,
        isLoading: false,
      };
      break;
    case 'REGISTER':
      return {
        ...prevState,
        userName: action.id,
        userToken: action.token,
        isLoading: false,
      };
      break;
    default:
      return prevState;
  }
};

export default Login;
