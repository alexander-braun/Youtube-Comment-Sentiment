import {
  SET_SENTIMENT,
  SET_SENTIMENT_COUNT,
  SET_HIGHEST_COMMENT,
  SET_LOWEST_COMMENT,
  SET_COMMENT_COUNT,
  AppActions,
} from './constants';
import { SentimentCount, HighLowComment } from '../components/types/Comment';

export const setSentiment = (sentiment: number): AppActions => ({
  type: SET_SENTIMENT,
  sentiment,
});

export const setSentimentCount = (
  sentimentCount: SentimentCount
): AppActions => ({
  type: SET_SENTIMENT_COUNT,
  sentimentCount,
});

export const setHighestComment = (
  highestComment: HighLowComment
): AppActions => ({
  type: SET_HIGHEST_COMMENT,
  highestComment,
});

export const setLowestComment = (
  lowestComment: HighLowComment
): AppActions => ({
  type: SET_LOWEST_COMMENT,
  lowestComment,
});

export const setCommentCount = (commentCount: number): AppActions => ({
  type: SET_COMMENT_COUNT,
  commentCount,
});
