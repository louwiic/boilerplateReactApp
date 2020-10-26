import {createStore} from 'redux';
import allReducers from './reducers';
//import loginReducer from '../features/counter/loginSlice';

export const store = createStore(allReducers);
