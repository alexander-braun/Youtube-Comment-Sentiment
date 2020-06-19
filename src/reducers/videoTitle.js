import { SET_VIDEO_TITLE } from '../actions/constants';

export const videoTitle = (state = '', action) => {
  switch (action.type) {
    case SET_VIDEO_TITLE:
      return action.videoTitle;
    default:
      return state;
  }
};
