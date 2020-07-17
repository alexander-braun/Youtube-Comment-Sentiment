export const SET_VIDEO_TITLE = 'SET_VIDEO_TITLE';

export const SET_SENTIMENT = 'SET_SENTIMENT';
export const SET_SENTIMENT_COUNT = 'SET_SENTIMENT_COUNT';
export const SET_HIGHEST_COMMENT = 'SET_HIGHEST_COMMENT';
export const SET_LOWEST_COMMENT = 'SET_LOWEST_COMMENT';
export const SET_COMMENT_COUNT = 'SET_COMMENT_COUNT';
export const SET_CHOICE = 'SET_CHOICE';
export const SET_COMMENTS = 'SET_COMMENTS';
export const SET_HIGHEST_AND_LOWEST_COMMENT_COUNT =
  'SET_HIGHEST_AND_LOWEST_COMMENT_COUNT';
export const SET_KEYCOUNTS = 'SET_KEYCOUNTS';
export const TOGGLE_NO_COMMENTS_MODAL = 'TOGGLE_NO_COMMENTS_MODAL';
export const SET_HIGHEST_SENTIMENT_SINGLE_WORDS =
  'SET_HIGHEST_SENTIMENT_SINGLE_WORD';
export const SET_LOWEST_SENTIMENT_SINGLE_WORDS =
  'SET_LOWEST_SENTIMENT_SINGLE_WORD';

export interface SetHighestSentimentSingleWords {
  type: typeof SET_HIGHEST_SENTIMENT_SINGLE_WORDS;
  highestSingleWords: {
    word: string;
    sentiment: number;
    category?: number;
  }[];
}

export interface SetLowestSentimentSingleWords {
  type: typeof SET_LOWEST_SENTIMENT_SINGLE_WORDS;
  lowestSingleWords: {
    word: string;
    sentiment: number;
    category?: number;
  }[];
}

export interface ToggleModal {
  type: typeof TOGGLE_NO_COMMENTS_MODAL;
}

export interface SetHighLowCommentCount {
  type: typeof SET_HIGHEST_AND_LOWEST_COMMENT_COUNT;
  highLowCommentCount: [number, number];
}

export interface SetKeyCounts {
  type: typeof SET_KEYCOUNTS;
  keyCounts: { [key: string]: Number };
}

export interface SetComments {
  type: typeof SET_COMMENTS;
  comments: [string, number, string, number, string][];
}

export interface setChoice {
  type: typeof SET_CHOICE;
  choice: 'keywords' | 'compare-sentiment';
}

export interface SetVideoTitle {
  type: typeof SET_VIDEO_TITLE;
  videoTitle: string;
}

export interface SetSentiment {
  type: typeof SET_SENTIMENT;
  sentiment: string;
}

export interface SetSentimentCount {
  type: typeof SET_SENTIMENT_COUNT;
  sentimentCount: number[];
}

export interface SetHighestComment {
  type: typeof SET_HIGHEST_COMMENT;
  highestComment: [number, string];
}

export interface SetLowestComment {
  type: typeof SET_LOWEST_COMMENT;
  lowestComment: [number, string];
}

export interface SetCommentCount {
  type: typeof SET_COMMENT_COUNT;
  commentCount: number;
}

export type CommentCountHighLow = SetHighLowCommentCount;

export type VideoTitleActionTypes = SetVideoTitle;

export type Choice = setChoice;

export type CommentsActionTypes = SetComments;

export type KeyCounts = SetKeyCounts;

export type ModalActionTypes = ToggleModal;

export type SingleWordSentiments =
  | SetHighestSentimentSingleWords
  | SetLowestSentimentSingleWords;

export type SentimentActionTypes =
  | SetSentiment
  | SetSentimentCount
  | SetHighestComment
  | SetLowestComment
  | SetCommentCount;

export type AppActions =
  | SentimentActionTypes
  | Choice
  | VideoTitleActionTypes
  | CommentsActionTypes
  | CommentCountHighLow
  | KeyCounts
  | ModalActionTypes
  | SingleWordSentiments;
