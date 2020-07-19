import { SingleWord } from '../types/SingleWord';
var Analyzer = require('natural').SentimentAnalyzer;
var stemmer = require('natural').PorterStemmer;
const analyzer = new Analyzer('English', stemmer, 'afinn');

/**
 * Goes through all the comments and finds words <= -1 or >= 1 and puts them in an array
 * Counts positive, neutral and negative comments
 * Finds the highest and lowest sentiment comments
 * Gets the overall sentiment
 */

const singleWordSentiments = (
  tokenized: string[],
  lowWords: SingleWord[],
  highWords: SingleWord[]
): void => {
  let sentimentSingle;
  for (let j = 0; j < tokenized.length; j++) {
    sentimentSingle = parseFloat(analyzer.getSentiment([tokenized[j]]));
    let obj: { word: string; sentiment: number } = { word: '', sentiment: 0 };
    if (sentimentSingle <= -1) {
      obj['word'] = tokenized[j];
      obj['sentiment'] = sentimentSingle;
      lowWords.push(obj);
    } else if (sentimentSingle >= 1) {
      obj['word'] = tokenized[j];
      obj['sentiment'] = sentimentSingle;
      highWords.push(obj);
    }
  }
};

type getWholeCommentSentiment = [
  [number, string],
  [number, string],
  [number, number, number],
  number
];

const getWholeCommentSentiment = (
  comments: string[],
  length: number
): getWholeCommentSentiment => {
  const analyzer = new Analyzer('English', stemmer, 'afinn');

  let highest: [number, string] = [-10, ''];
  let lowest: [number, string] = [10, ''];
  let sentimentCount: [number, number, number] = [0, 0, 0];
  let sentiments = 0;

  for (let i = 0; i < length; i++) {
    let tokenized = comments[i].split(' ');
    const sentiment = parseFloat(analyzer.getSentiment(tokenized));

    sentiment > 0 && sentimentCount[2]++;
    sentiment === 0 && sentimentCount[1]++;
    sentiment < 0 && sentimentCount[0]++;

    sentiment > highest[0] &&
      (highest[0] = sentiment) &&
      (highest[1] = comments[i]);
    sentiment < lowest[0] &&
      (lowest[0] = sentiment) &&
      (lowest[1] = comments[i]);

    if (!isNaN(sentiment)) {
      sentiments += sentiment;
    }
  }
  return [highest, lowest, sentimentCount, sentiments];
};

const getHighestAndLowestSingleWordSentiments = (
  comments: string[],
  length: number
): [SingleWord[], SingleWord[]] => {
  // Array of objects collecting words <= -1 or >= 1
  let lowWords: SingleWord[] = [];
  let highWords: SingleWord[] = [];

  for (let i = 0; i < length; i++) {
    let tokenized = comments[i].split(' ');
    // Get the single word sentiments
    singleWordSentiments(tokenized, lowWords, highWords);
  }

  return [highWords, lowWords];
};

export const sentiments = (
  comments: string[]
): [
  number,
  [number, number, number],
  [number, string],
  [number, string],
  SingleWord[],
  SingleWord[]
] => {
  let length = comments.length;
  const highestLowestWords = getHighestAndLowestSingleWordSentiments(
    comments,
    length
  );
  const highWords = highestLowestWords[0];
  const lowWords = highestLowestWords[1];

  const wholeWordSentiments = getWholeCommentSentiment(comments, length);
  const highestComment = wholeWordSentiments[0];
  const lowestComment = wholeWordSentiments[1];
  const sentimentCount = wholeWordSentiments[2];
  const sentiments = wholeWordSentiments[3];
  return [
    sentiments / length,
    sentimentCount,
    highestComment,
    lowestComment,
    lowWords,
    highWords,
  ];
};
