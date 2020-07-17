/**
 * Uses the noembed site to get the video title, reduces api cost
 */

interface Comments {
  author_url: string;
  type: string;
  provider_url: string;
  thumbnail_height: number;
  width: number;
  provider_name: string;
  url: string;
  author_name: string;
  title: string;
  thumbnail_width: number;
  thumbnail_url: string;
  height: number;
  version: string;
  html: string;
}

export const fetchVideoTitle = async (ID: string) => {
  if (ID && ID !== undefined) {
    const url: string = `https://noembed.com/embed?url=https%3A%2F%2Fhttps://www.youtube.com/watch?v=${ID}`;
    const response = await fetch(url);
    const data: Comments = await response.json();
    const title: string = data['title'];
    return title;
  }
  return null;
};
