import React from 'react';
import { useSelector } from 'react-redux';
import Bubblechart from './Bubblechart';
import HighestLowestAverage from './HighestLowestAverage';
import InfiniteScrollWindow from './InfiniteScrollWindow';
import { AppState } from '../reducers';

function Display() {
  const sentiment = useSelector((state: AppState) => state.sentiment.sentiment);
  const sentimentCount = useSelector(
    (state: AppState) => state.sentiment.sentimentCount
  );
  const highestComment = useSelector(
    (state: AppState) => state.sentiment.highestComment
  );
  const lowestComment = useSelector(
    (state: AppState) => state.sentiment.lowestComment
  );
  const videoTitle = useSelector((state: AppState) => state.videoTitle);
  const keyCounts = useSelector((state: AppState) => state.keyCounts);
  const singleWordSentiments = useSelector(
    (state: AppState) => state.singleWordSentiments
  );

  if (!sentiment) return null;
  return (
    <div className="display">
      <h2 className="display__title-name">{videoTitle}</h2>
      <HighestLowestAverage
        sentimentCount={sentimentCount}
        lowestComment={lowestComment}
        highestComment={highestComment}
        sentiment={sentiment}
      />
      <InfiniteScrollWindow />
      <Bubblechart data={keyCounts} dataSingleWords={singleWordSentiments} />
    </div>
  );
}

export default Display;
