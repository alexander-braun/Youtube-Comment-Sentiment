import { TOGGLE_NO_COMMENTS_MODAL } from '../actions/constants';

export const noCommentsModal = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_NO_COMMENTS_MODAL:
      return !state;
    default:
      return state;
  }
};
