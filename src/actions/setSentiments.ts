import {
  SET_SENTIMENT,
  SET_SENTIMENT_COUNT,
  SET_HIGHEST_COMMENT,
  SET_LOWEST_COMMENT,
  SET_COMMENT_COUNT,
  AppActions,
} from './constants';

export const setSentiment = (sentiment: number): AppActions => ({
  type: SET_SENTIMENT,
  sentiment,
});

export const setSentimentCount = (
  sentimentCount: [number, number, number]
): AppActions => ({
  type: SET_SENTIMENT_COUNT,
  sentimentCount,
});

export const setHighestComment = (
  highestComment: [number, string]
): AppActions => ({
  type: SET_HIGHEST_COMMENT,
  highestComment,
});

export const setLowestComment = (
  lowestComment: [number, string]
): AppActions => ({
  type: SET_LOWEST_COMMENT,
  lowestComment,
});

export const setCommentCount = (commentCount: number): AppActions => ({
  type: SET_COMMENT_COUNT,
  commentCount,
});
