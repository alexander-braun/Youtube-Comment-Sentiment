import {
  SET_HIGHEST_SENTIMENT_SINGLE_WORDS,
  SET_LOWEST_SENTIMENT_SINGLE_WORDS,
  AppActions,
} from './constants';
import { SingleWord } from '../components/types/SingleWord';

export const setHighestSingleWords = (
  highestSingleWords: SingleWord[]
): AppActions => ({
  type: SET_HIGHEST_SENTIMENT_SINGLE_WORDS,
  highestSingleWords,
});

export const setLowestSingleWords = (
  lowestSingleWords: SingleWord[]
): AppActions => ({
  type: SET_LOWEST_SENTIMENT_SINGLE_WORDS,
  lowestSingleWords,
});
