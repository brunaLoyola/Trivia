export const CREATE_PLAYER = 'CREATE_PLAYER';
export const CREATE_PONTUATION = 'CREATE_PONTUATION';

export const createPlayer = (name, gravatarEmail) => ({
  type: CREATE_PLAYER,
  payload: { name, gravatarEmail },
});

export const createPontuation = (assertions, score) => ({
  type: CREATE_PLAYER,
  payload: { assertions, score },
});
