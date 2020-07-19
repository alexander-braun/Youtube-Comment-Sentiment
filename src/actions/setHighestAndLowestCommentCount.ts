import { SET_HIGHEST_AND_LOWEST_COMMENT_COUNT, AppActions } from './constants';
import { HighLowCommentCount } from '../components/types/Comment';

export const setHighestAndLowestCommentCount = (
  highLowCommentCount: HighLowCommentCount
): AppActions => ({
  type: SET_HIGHEST_AND_LOWEST_COMMENT_COUNT,
  highLowCommentCount,
});
