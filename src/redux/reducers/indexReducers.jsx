import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { rankingReducer } from './rankingReducer';
import player from './player';

const rootReducer = combineReducers({ userReducer, rankingReducer, player });

export default rootReducer;
