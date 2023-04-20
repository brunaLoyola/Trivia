import { CREATE_PLAYER } from '../actions/playerActions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
};

const playerReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case CREATE_PLAYER:
    return {
      ...state,
      name: payload.name,
      assertions: payload.assertions,
      score: payload.score,
      gravatarEmail: payload.gravatarEmail,
    };

  default:
    return state;
  }
};

export default playerReducer;
