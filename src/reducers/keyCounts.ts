import { SET_KEYCOUNTS, KeyCounts } from '../actions/constants';

export const keyCounts = (
  state: { [key: string]: number } = {},
  action: KeyCounts
): { [key: string]: number } => {
  switch (action.type) {
    case SET_KEYCOUNTS:
      return action.keyCounts;
    default:
      return state;
  }
};
