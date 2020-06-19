import React from 'react';
import { useSelector } from 'react-redux';
import Bubblechart from './Bubblechart';
import MaxComments from './MaxComments';
import InfiniteScrollWindow from './InfiniteScrollWindow';

function Display() {
  const sentiment = useSelector((state) => state.sentiment.sentiment);
  const sentimentCount = useSelector((state) => state.sentiment.sentimentCount);
  const highestComment = useSelector((state) => state.sentiment.highestComment);
  const lowestComment = useSelector((state) => state.sentiment.lowestComment);
  const videoTitle = useSelector((state) => state.videoTitle);
  const keyCounts = useSelector((state) => state.keyCounts);
  const singleWordSentiments = useSelector(
    (state) => state.singleWordSentiments
  );

  if (!sentiment) return null;
  return (
    <div className="display">
      <h2 className="display__title-name">{videoTitle}</h2>
      <MaxComments
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
