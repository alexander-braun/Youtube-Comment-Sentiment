/**
 * Takes the video link and returns the ID
 */
export const shoertenToVideoID = (link: string) => {
  const equalSignIndex = link.search('=');
  const videoID = link.slice(equalSignIndex + 1);
  return videoID;
};
