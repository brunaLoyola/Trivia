import { CREATE_PLAYER } from '../actions/playerActions';

const INITIAL_STATE = ({
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
});

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case CREATE_PLAYER:
    return {
      ...state,
      name: payload.name,
      assertions: payload.assertions,
      score: state.score + payload.score,
      gravatarEmail: payload.gravatarEmail,
    };
  default:
    return state;
  }
};

export default player;
