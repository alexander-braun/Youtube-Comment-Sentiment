import {
  TOGGLE_NO_COMMENTS_MODAL,
  ModalActionTypes,
} from '../actions/constants';

export const noCommentsModal = (
  state: boolean = false,
  action: ModalActionTypes
): boolean => {
  switch (action.type) {
    case TOGGLE_NO_COMMENTS_MODAL:
      return !state;
    default:
      return state;
  }
};
