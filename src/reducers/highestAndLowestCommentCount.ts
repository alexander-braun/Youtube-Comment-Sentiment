import {
  SET_HIGHEST_AND_LOWEST_COMMENT_COUNT,
  CommentCountActionTypes,
} from '../actions/constants';
import { HighLowCommentCount } from '../components/types/Comment';

export const highestAndLowestCommentCount = (
  state: HighLowCommentCount = [0, 0],
  action: CommentCountActionTypes
): HighLowCommentCount => {
  switch (action.type) {
    case SET_HIGHEST_AND_LOWEST_COMMENT_COUNT:
      return action.highLowCommentCount;
    default:
      return state;
  }
};
