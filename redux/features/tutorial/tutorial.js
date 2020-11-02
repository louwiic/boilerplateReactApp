import React from 'react';

const initialLoginState = {
    alrea
  };


const loginReducer = (prevState, action) => {
    switch (action.type) {
        case 'RETRIEVE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
      }
};

export {
  loginReducer, initialLoginState
} ;
