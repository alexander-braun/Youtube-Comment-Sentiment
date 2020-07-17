import { SET_VIDEO_TITLE, VideoTitleActionTypes } from '../actions/constants';

export const videoTitle = (
  state = '',
  action: VideoTitleActionTypes
): string => {
  switch (action.type) {
    case SET_VIDEO_TITLE:
      return action.videoTitle;
    default:
      return state;
  }
};
