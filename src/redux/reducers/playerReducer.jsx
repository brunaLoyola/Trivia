import { CREATE_PLAYER, CREATE_PONTUATION } from '../actions/playerActions';

const INITIAL_STATE = Immutable({
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
});

const playerReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case CREATE_PLAYER:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.gravatarEmail,
    };
  case CREATE_PONTUATION:
    return {
      ...state,
      assertions: payload.assertions,
      score: payload.score,
    };
  default:
    return state;
  }
};

export default playerReducer;
