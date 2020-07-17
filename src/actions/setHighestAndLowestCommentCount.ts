import { SET_HIGHEST_AND_LOWEST_COMMENT_COUNT, AppActions } from './constants';

export const setHighestAndLowestCommentCount = (
  highLowCommentCount: [number, number]
): AppActions => ({
  type: SET_HIGHEST_AND_LOWEST_COMMENT_COUNT,
  highLowCommentCount,
});
