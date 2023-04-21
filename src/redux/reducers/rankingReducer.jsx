import { SET_RANKING } from '../actions/rankingActions';

const INITIAL_STATE = {
  ranking: [],
};

export const rankingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_RANKING:
    return {
      ...state,
      ranking: action.payload,
    };
  default:
    return state;
  }
};
