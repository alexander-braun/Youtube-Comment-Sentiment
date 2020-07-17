import { combineReducers } from 'redux';
import { videoTitle } from './videoTitle';
import { sentiment } from './sentiment';
import { keyCounts } from './keyCounts';
import { comments } from './comments';
import { highestAndLowestCommentCount } from './highestAndLowestCommentCount';
import { singleWordSentiments } from './singleWordSentiments';
import { choice } from './choice';
import { noCommentsModal } from './noCommentsModal';

export const rootReducer = combineReducers({
  videoTitle,
  sentiment,
  keyCounts,
  comments,
  highestAndLowestCommentCount,
  singleWordSentiments,
  choice,
  noCommentsModal,
});

export type AppState = ReturnType<typeof rootReducer>;
