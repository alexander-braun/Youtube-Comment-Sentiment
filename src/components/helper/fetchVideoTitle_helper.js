/**
 * Uses the noembed site to get the video title, reduces api cost
 */
export const fetchVideoTitle = async (ID) => {
  if (ID && ID !== undefined) {
    let url = `https://noembed.com/embed?url=https%3A%2F%2Fhttps://www.youtube.com/watch?v=${ID}`;
    const response = await fetch(url);
    const data = await response.json();
    const title = await data['title'];
    return title;
  }
  return null;
};
