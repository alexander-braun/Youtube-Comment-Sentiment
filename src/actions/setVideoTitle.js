import { SET_VIDEO_TITLE } from './constants';

export const setVideoTitle = (videoTitle) => ({
  type: SET_VIDEO_TITLE,
  videoTitle,
});
