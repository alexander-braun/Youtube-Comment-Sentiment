import { SET_COMMENTS, AppActions } from './constants';
import { Comment } from '../components/types/Comment';

export const setComments = (comments: Comment[]): AppActions => ({
  type: SET_COMMENTS,
  comments,
});
