import { SET_CHOICE, AppActions } from './constants';

export const setChoice = (
  choice: 'keywords' | 'compare-sentiment'
): AppActions => ({
  type: SET_CHOICE,
  choice,
});
