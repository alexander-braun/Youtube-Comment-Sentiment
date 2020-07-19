export interface SingleWord {
  word: string;
  sentiment: number;
  category?: number;
}

export type SingleWords = SingleWord[];

export interface SingleWordsSentiment {
  highestSingleWords: SingleWords | {};
  lowestSingleWords: SingleWords | {};
}
