import {combineReducers} from 'redux';
import dataList from './features/home/dataList';

const allReducers = combineReducers({
  dataHomeList: dataList,
});

export default allReducers;
