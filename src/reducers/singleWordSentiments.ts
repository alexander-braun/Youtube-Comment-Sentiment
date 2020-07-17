import {
  SET_HIGHEST_SENTIMENT_SINGLE_WORDS,
  SET_LOWEST_SENTIMENT_SINGLE_WORDS,
  SingleWordSentimentsActionTypes,
} from '../actions/constants';

const initialState = {
  highestSingleWords: {},
  lowestSingleWords: {},
};

interface singleWordSentiments {
  highestSingleWords: oneWordSentiments | {};
  lowestSingleWords: oneWordSentiments | {};
}

interface oneWordSentiments {
  highestSingleWords: {
    word: string;
    sentiment: number;
    category?: number;
  }[];
}

export const singleWordSentiments = (
  state: singleWordSentiments = initialState,
  action: SingleWordSentimentsActionTypes
): singleWordSentiments => {
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
