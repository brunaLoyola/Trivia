import { CREATE_USER } from '../actions/indexActions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case CREATE_USER:
    return {
      ...state,
      name: payload.name,
      email: payload.email,
    };

  default:
    return state;
  }
};

export default userReducer;
