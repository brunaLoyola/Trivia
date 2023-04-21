import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { rankingReducer } from './rankingReducer';

const rootReducer = combineReducers({ userReducer, rankingReducer });

export default rootReducer;
