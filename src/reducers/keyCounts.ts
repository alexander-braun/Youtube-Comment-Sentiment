import { SET_KEYCOUNTS, KeyCountsActionTypes } from '../actions/constants';
import { KeyCounts } from '../components/types/KeyCounts';

export const keyCounts = (
  state: KeyCounts = {},
  action: KeyCountsActionTypes
): KeyCounts => {
  switch (action.type) {
    case SET_KEYCOUNTS:
      return action.keyCounts;
    default:
      return state;
  }
};
