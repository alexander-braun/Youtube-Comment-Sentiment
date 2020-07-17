import { SET_COMMENTS, CommentsActionTypes } from '../actions/constants';

type Comments = [string, number, string, number, string][];
const initialState: Comments = [];

export const comments = (
  state = initialState,
  action: CommentsActionTypes
): Comments => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments;
    default:
      return state;
  }
};
