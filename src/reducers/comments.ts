import { SET_COMMENTS, CommentsActionTypes } from '../actions/constants';
import { Comment } from '../components/types/Comment';

const initialState: Comment[] = [];

export const comments = (
  state = initialState,
  action: CommentsActionTypes
): Comment[] => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments;
    default:
      return state;
  }
};
