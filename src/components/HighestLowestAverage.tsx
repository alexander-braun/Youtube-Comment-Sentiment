import React from 'react';
import { scaleLinear } from 'd3';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { AppState } from '../reducers';
import { HighLowComment, Sentiment, SentimentCount } from './types/Comment';

interface HighestLowestAverage {
  lowestComment: HighLowComment;
  highestComment: HighLowComment;
  sentiment: Sentiment;
  sentimentCount: SentimentCount;
}

const HighestLowestAverage = ({
  lowestComment,
  highestComment,
  sentiment,
  sentimentCount,
}: HighestLowestAverage) => {
  const highestCommentLikes = useSelector(
    (state: AppState) => state.highestAndLowestCommentCount[0]
  );

  const lowestCommentLikes = useSelector(
    (state: AppState) => state.highestAndLowestCommentCount[1]
  );

  const colorScale = scaleLinear<string>()
    .domain([-2, 2])
    .range(['rgb(238, 0, 0)', 'rgb(66, 230, 0)']);

  const styleHighest = {
    color: colorScale(highestComment[0]),
  };

  const styleLowest = {
    color: colorScale(lowestComment[0]),
  };

  const average = {
    color: colorScale(sentiment),
  };
  const generateSentimentField = () => {
    const headings = [
      'Highest Sentiment',
      'Lowest Sentiment',
      'Average Sentiment',
    ];
    let output = [];
    for (let heading of headings) {
      output.push(
        <div className="card" key={uuidv4()}>
          <span className="card__heading">
            <h2 className="card__title">{heading}</h2>
            <div
              className="card__sentiment"
              style={
                heading === 'Lowest Sentiment'
                  ? styleLowest
                  : heading === 'Highest Sentiment'
                  ? styleHighest
                  : average
              }
            >
              {heading === 'Highest Sentiment'
                ? highestComment &&
                  (highestComment[0] > 0 ? '+' : '') +
                    highestComment[0].toString().slice(0, 5)
                : heading === 'Lowest Sentiment'
                ? lowestComment &&
                  (lowestComment[0] > 0 ? '+' : '') +
                    lowestComment[0].toString().slice(0, 5)
                : (sentiment > 0 ? '+' : '') + sentiment.toString().slice(0, 4)}
            </div>
          </span>
          {heading === 'Highest Sentiment' || heading === 'Lowest Sentiment' ? (
            <div className="card__comment">
              {heading === 'Highest Sentiment'
                ? `"${highestComment[1]}"`
                : heading === 'Lowest Sentiment'
                ? `"${lowestComment[1]}"`
                : null}
            </div>
          ) : null}
          {heading === 'Average Sentiment' ? (
            <div className="card__average">
              <h6 className="card__average-sentiment">
                Negative Sentiments: {sentimentCount[0]}
              </h6>
              <h6 className="card__average-sentiment">
                Neutral Sentiments: {sentimentCount[1]}
              </h6>
              <h6 className="card__average-sentiment">
                Positive Sentiments: {sentimentCount[2]}
              </h6>
            </div>
          ) : null}
          {heading === 'Lowest Sentiment' ? (
            <div className="card__comment-likes">
              Likes:
              {lowestCommentLikes}
            </div>
          ) : heading === 'Highest Sentiment' ? (
            <div className="card__comment-likes">
              Likes:
              {highestCommentLikes}
            </div>
          ) : (
            <div className="card__comment-likes">
              Comments: {sentimentCount.reduce((a, b) => a + b)}
            </div>
          )}
        </div>
      );
    }
    return output;
  };
  return (
    <div className="comments" style={{ position: 'relative', padding: '0' }}>
      {generateSentimentField()}
    </div>
  );
};

export default HighestLowestAverage;
