export interface CommentsInterface {
  kind: string;
  etag: string;
  nextPageToken: string;
  pageInfo: PageInfoInterface;
  items: ItemInterface[];
}

export interface ItemInterface {
  kind: string;
  etag: string;
  id: string;
  snippet: ItemSnippetInterface;
}

export interface ItemSnippetInterface {
  videoId: string;
  topLevelComment: TopLevelCommentInterface;
  canReply: boolean;
  totalReplyCount: number;
  isPublic: boolean;
}

export interface TopLevelCommentInterface {
  kind: string;
  etag: string;
  id: string;
  snippet: TopLevelCommentSnippetInterface;
}

export interface TopLevelCommentSnippetInterface {
  videoId: string;
  textDisplay: string;
  textOriginal: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  authorChannelUrl: string;
  authorChannelId: AuthorChannelIDInterface;
  canRate: boolean;
  viewerRating: string;
  likeCount: number;
  publishedAt: Date;
  updatedAt: Date;
}

export interface AuthorChannelIDInterface {
  value: string;
}

export interface PageInfoInterface {
  totalResults: number;
  resultsPerPage: number;
}
