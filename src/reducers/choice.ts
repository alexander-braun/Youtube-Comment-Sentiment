import { SET_CHOICE, ChartChoiceActionTypes } from '../actions/constants';

export const choice = (
  state: string = 'keywords',
  action: ChartChoiceActionTypes
): string => {
  switch (action.type) {
    case SET_CHOICE:
      return action.choice;
    default:
      return state;
  }
};
