import { SingleWords } from '../components/types/SingleWord';
import { HighLowCommentCount, Comment } from '../components/types/Comment';
import { KeyCounts } from '../components/types/KeyCounts';
import { Choice } from '../components/types/Choice';
import {
  HighLowComment,
  SentimentCount,
  Sentiment,
  CommentCount,
} from '../components/types/Comment';

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
  highLowCommentCount: HighLowCommentCount;
}

export interface SetKeyCounts {
  type: typeof SET_KEYCOUNTS;
  keyCounts: KeyCounts;
}

export interface SetComments {
  type: typeof SET_COMMENTS;
  comments: Comment[];
}

export interface setChoice {
  type: typeof SET_CHOICE;
  choice: Choice;
}

export interface SetVideoTitle {
  type: typeof SET_VIDEO_TITLE;
  videoTitle: string;
}

export interface SetSentiment {
  type: typeof SET_SENTIMENT;
  sentiment: Sentiment;
}

export interface SetSentimentCount {
  type: typeof SET_SENTIMENT_COUNT;
  sentimentCount: SentimentCount;
}

export interface SetHighestComment {
  type: typeof SET_HIGHEST_COMMENT;
  highestComment: HighLowComment;
}

export interface SetLowestComment {
  type: typeof SET_LOWEST_COMMENT;
  lowestComment: HighLowComment;
}

export interface SetCommentCount {
  type: typeof SET_COMMENT_COUNT;
  commentCount: CommentCount;
}

export type CommentCountActionTypes = SetHighLowCommentCount;

export type VideoTitleActionTypes = SetVideoTitle;

export type ChartChoiceActionTypes = setChoice;

export type CommentsActionTypes = SetComments;

export type KeyCountsActionTypes = SetKeyCounts;

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
  | KeyCountsActionTypes
  | ModalActionTypes
  | SingleWordSentimentsActionTypes;
