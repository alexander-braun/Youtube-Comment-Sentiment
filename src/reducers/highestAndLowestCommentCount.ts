import {
  SET_HIGHEST_AND_LOWEST_COMMENT_COUNT,
  CommentCountActionTypes,
} from '../actions/constants';

export const highestAndLowestCommentCount = (
  state: [number, number] = [0, 0],
  action: CommentCountActionTypes
): [number, number] => {
  switch (action.type) {
    case SET_HIGHEST_AND_LOWEST_COMMENT_COUNT:
      return action.highLowCommentCount;
    default:
      return state;
  }
};
