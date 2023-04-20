export const CREATE_PLAYER = 'CREATE_PLAYER';

export const createPlayer = (player) => ({
  type: CREATE_PLAYER,
  payload: { player },
});
