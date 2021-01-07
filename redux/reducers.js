import {combineReducers} from 'redux';
import loginReducer from './features/auth/authentication';
import dataList from './features/home/dataList';

const allReducers = combineReducers({
  dataHomeList: dataList,
  loginReducer: loginReducer,
});

export default allReducers;
