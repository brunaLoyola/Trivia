export const CREATE_PLAYER = 'CREATE_PLAYER';
export const CREATE_PONTUATION = 'CREATE_PONTUATION';

export const createPlayer = (name, assertions, score, gravatarEmail) => ({
  type: CREATE_PLAYER,
  payload: { name, assertions, score, gravatarEmail },
});
