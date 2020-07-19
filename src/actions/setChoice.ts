import { SET_CHOICE, AppActions } from './constants';
import { Choice } from '../components/types/Choice';

export const setChoice = (choice: Choice): AppActions => ({
  type: SET_CHOICE,
  choice,
});
