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

type SingleWords = { word: string; sentiment: number; category?: number }[];

export interface SetHighestSentimentSingleWords {
  type: typeof SET_HIGHEST_SENTIMENT_SINGLE_WORDS;
  highestSingleWords: SingleWords;
}

export interface SetLowestSentimentSingleWords {
  type: typeof SET_LOWEST_SENTIMENT_SINGLE_WORDS;
  lowestSingleWords: SingleWords;
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
  keyCounts: { [key: string]: number };
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
  sentiment: number;
}

export interface SetSentimentCount {
  type: typeof SET_SENTIMENT_COUNT;
  sentimentCount: [number, number, number];
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

export type CommentCountActionTypes = SetHighLowCommentCount;

export type VideoTitleActionTypes = SetVideoTitle;

export type ChartChoiceActionTypes = setChoice;

export type CommentsActionTypes = SetComments;

export type KeyCounts = SetKeyCounts;

export type ModalActionTypes = ToggleModal;

export type SingleWordSentimentsActionTypes =
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
  | ChartChoiceActionTypes
  | VideoTitleActionTypes
  | CommentsActionTypes
  | CommentCountActionTypes
  | KeyCounts
  | ModalActionTypes
  | SingleWordSentimentsActionTypes;
