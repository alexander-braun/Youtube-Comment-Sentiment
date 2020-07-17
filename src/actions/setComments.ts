import { SET_COMMENTS, AppActions } from './constants';

export const setComments = (
  comments: [string, number, string, number, string][]
): AppActions => ({
  type: SET_COMMENTS,
  comments,
});
