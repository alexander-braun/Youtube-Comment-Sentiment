import {
  SET_HIGHEST_SENTIMENT_SINGLE_WORDS,
  SET_LOWEST_SENTIMENT_SINGLE_WORDS,
  AppActions,
} from './constants';

interface Singleword {
  word: string;
  sentiment: number;
  category?: number;
}

export const setHighestSingleWords = (
  highestSingleWords: Singleword[]
): AppActions => ({
  type: SET_HIGHEST_SENTIMENT_SINGLE_WORDS,
  highestSingleWords,
});

export const setLowestSingleWords = (
  lowestSingleWords: Singleword[]
): AppActions => ({
  type: SET_LOWEST_SENTIMENT_SINGLE_WORDS,
  lowestSingleWords,
});
