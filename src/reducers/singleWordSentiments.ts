import {
  SET_HIGHEST_SENTIMENT_SINGLE_WORDS,
  SET_LOWEST_SENTIMENT_SINGLE_WORDS,
  SingleWordSentimentsActionTypes,
} from '../actions/constants';
import { SingleWordsSentiment } from '../components/types/SingleWord';

const initialState = {
  highestSingleWords: {},
  lowestSingleWords: {},
};

export const singleWordSentiments = (
  state: SingleWordsSentiment = initialState,
  action: SingleWordSentimentsActionTypes
): SingleWordsSentiment => {
  switch (action.type) {
    case SET_HIGHEST_SENTIMENT_SINGLE_WORDS:
      return {
        ...state,
        highestSingleWords: action.highestSingleWords,
      };
    case SET_LOWEST_SENTIMENT_SINGLE_WORDS:
      return {
        ...state,
        lowestSingleWords: action.lowestSingleWords,
      };
    default:
      return state;
  }
};
