import {
  SET_SENTIMENT,
  SET_SENTIMENT_COUNT,
  SET_HIGHEST_COMMENT,
  SET_LOWEST_COMMENT,
  SET_COMMENT_COUNT,
  SentimentActionTypes,
} from '../actions/constants';

const initialState: sentiment = {
  sentiment: 0,
  sentimentCount: [0, 0, 0],
  highestComment: [NaN, ''],
  lowestComment: [NaN, ''],
  commentCount: 0,
};

interface sentiment {
  sentiment: number;
  sentimentCount: [number, number, number];
  highestComment: [number, string];
  lowestComment: [number, string];
  commentCount: number;
}

export const sentiment = (
  state: sentiment = initialState,
  action: SentimentActionTypes
): sentiment => {
  switch (action.type) {
    case SET_SENTIMENT:
      return {
        ...state,
        sentiment: action.sentiment,
      };
    case SET_SENTIMENT_COUNT:
      return {
        ...state,
        sentimentCount: action.sentimentCount,
      };
    case SET_HIGHEST_COMMENT:
      return {
        ...state,
        highestComment: action.highestComment,
      };
    case SET_LOWEST_COMMENT:
      return {
        ...state,
        lowestComment: action.lowestComment,
      };
    case SET_COMMENT_COUNT:
      return {
        ...state,
        commentCount: action.commentCount,
      };
    default:
      return state;
  }
};
