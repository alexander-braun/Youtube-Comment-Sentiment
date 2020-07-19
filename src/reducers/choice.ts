import { SET_CHOICE, ChartChoiceActionTypes } from '../actions/constants';
import { Choice } from '../components/types/Choice';

export const choice = (
  state: Choice = 'keywords',
  action: ChartChoiceActionTypes
): Choice => {
  switch (action.type) {
    case SET_CHOICE:
      return action.choice;
    default:
      return state;
  }
};
