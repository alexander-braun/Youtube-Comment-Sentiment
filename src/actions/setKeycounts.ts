import { SET_KEYCOUNTS, AppActions } from './constants';

export const setKeycounts = (keyCounts: {
  [key: string]: Number;
}): AppActions => ({
  type: SET_KEYCOUNTS,
  keyCounts,
});
