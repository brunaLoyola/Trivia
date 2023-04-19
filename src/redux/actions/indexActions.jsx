export const CREATE_USER = 'CREATE_USER';

export const createUser = (name, email, tokenUser) => ({
  type: CREATE_USER,
  payload: { name, email, tokenUser },
});
