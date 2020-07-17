import { SET_VIDEO_TITLE, AppActions } from './constants';

export const setVideoTitle = (videoTitle: string): AppActions => ({
  type: SET_VIDEO_TITLE,
  videoTitle,
});
