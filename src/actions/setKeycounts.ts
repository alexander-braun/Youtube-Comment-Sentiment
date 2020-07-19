import { SET_KEYCOUNTS, AppActions } from './constants';
import { KeyCounts } from '../components/types/KeyCounts';

export const setKeycounts = (keyCounts: KeyCounts): AppActions => ({
  type: SET_KEYCOUNTS,
  keyCounts,
});
