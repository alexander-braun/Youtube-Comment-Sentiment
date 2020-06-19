import {
  SET_HIGHEST_SENTIMENT_SINGLE_WORDS,
  SET_LOWEST_SENTIMENT_SINGLE_WORDS,
} from './constants';

export const setHighestSingleWords = (highestSingleWords) => ({
  type: SET_HIGHEST_SENTIMENT_SINGLE_WORDS,
  highestSingleWords,
});

export const setLowestSingleWords = (lowestSingleWords) => ({
  type: SET_LOWEST_SENTIMENT_SINGLE_WORDS,
  lowestSingleWords,
});
