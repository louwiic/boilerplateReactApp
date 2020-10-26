import {combineReducers} from 'redux';

import addQuantity from './features/addQuantity';
import login from './features/login';

const allReducers = combineReducers({
  addQuantity: addQuantity,
  login: login,
});

export default allReducers;
