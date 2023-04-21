import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { rankingReducer } from './rankingReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({ userReducer, rankingReducer, playerReducer });

export default rootReducer;
