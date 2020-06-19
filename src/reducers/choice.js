import { SET_CHOICE } from '../actions/constants';

export const choice = (state = 'keywords', action) => {
  switch (action.type) {
    case SET_CHOICE:
      return action.choice;
    default:
      return state;
  }
};
