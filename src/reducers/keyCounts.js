import { SET_KEYCOUNTS } from '../actions/constants';

export const keyCounts = (state = {}, action) => {
  switch (action.type) {
    case SET_KEYCOUNTS:
      return action.keyCounts;
    default:
      return state;
  }
};
