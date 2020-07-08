var Analyzer = require('natural').SentimentAnalyzer;
var stemmer = require('natural').PorterStemmer;
let apiKey = process.env.REACT_APP_API_KEY;

// Connection to the youtube API -> setup to get more then 100 comments (all the comments f.e.) but too much api cost atm
export const fetchComments = (videoID) => {
  let ID = videoID;
  let maxResults = 100;
  let analyzer = new Analyzer('English', stemmer, 'afinn');

  // Recursive Function to get each 100 comments
  async function fetchComments(textArr = [], token) {
    // If there are X comments already in array return array
    if (textArr[0] !== undefined) {
      // Every array has 100 comments in it so maxResults / 100 >= textArr.length tests if the maxResult-propertie is fullfilled
      if (maxResults / 100 >= textArr.length) {
        return textArr;
      }
    }

    /**
     * Change the url based on the existence of a nextpagetoken
     * Setup and working for future use but API cost was too high
     */
    let url;
    if (token) {
      url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=${ID}&maxResults=${maxResults}&pageToken=${token}`;
    } else {
      url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=${ID}&maxResults=${maxResults}`;
    }

    // Grab the data and get comment and likecount for comment
    const response = await fetch(url);
    const data = await response.json();
    const nextPageToken = await data['nextPageToken'];
    let comments = await data['items'];

    // If the address was f.e. empty and there are no results just return []
    if (!comments) return [];

    // Else put the comments and the likecount (not used yet) into an array
    comments = comments.map((comment) => {
      const splitcomment = comment['snippet']['topLevelComment']['snippet'][
        'textDisplay'
      ].split(' ');
      return [
        comment['snippet']['topLevelComment']['snippet']['textDisplay'],
        comment['snippet']['topLevelComment']['snippet']['likeCount'],
        comment['snippet']['topLevelComment']['snippet']['authorChannelId'][
          'value'
        ],
        analyzer.getSentiment(splitcomment),
        comment['snippet']['topLevelComment']['snippet']['authorChannelUrl'],
      ];
    });

    // Push data to array that is passed along
    textArr.push(comments);

    /**
     * If there is one more comment page to load grab the nextpagetoken for that site
     * Not used as it eats the free api usage too quickly. Could grab all other comments
     * If used
     */
    if (nextPageToken) {
      return fetchComments(textArr, nextPageToken);
    }

    // Or else just return the array
    else if (!nextPageToken) return textArr;
  }

  return fetchComments([], null);
};
