import { CREATE_USER } from '../actions/userActions';

const INITIAL_STATE = {
  name: '',
  email: '',
  tokenUser: '',
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case CREATE_USER:
    return {
      ...state,
      name: payload.name,
      email: payload.email,
      token: payload.tokenUser,
    };

  default:
    return state;
  }
};

export default userReducer;
