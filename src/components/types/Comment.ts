export type Comment = [string, number, string, number, string, number?];
export type HighLowCommentCount = [number, number];
export type HighLowComment = [number, string];
export type SentimentCount = [number, number, number];
export type Sentiment = number;
export type CommentCount = number;

export interface AverageSentiment {
  sentiment: Sentiment;
  sentimentCount: SentimentCount;
  highestComment: HighLowComment;
  lowestComment: HighLowComment;
  commentCount: CommentCount;
}
