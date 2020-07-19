import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import InfiniteScroll from 'react-infinite-scroller';
//Helper
import { filterComments } from './helper/filterComments_helper';
import { AppState } from '../reducers';
import { comment } from './types/Comment';

function InfiniteScrollWindow() {
  let comments = useSelector((state: AppState) => state.comments);
  let [commentsFiltered, setCommentsFiltered] = useState<
    comment[][] | undefined
  >();
  let [positiveComments, setPositiveComments] = useState<
    comment[] | undefined
  >();
  let [negativeComments, setNegativeComments] = useState<
    comment[] | undefined
  >();
  const [hasmoreItems, setHasmoreItems] = useState(true);

  /**
   * Filters the comments when comments change
   */
  useEffect(() => {
    setCommentsFiltered(filterComments(comments));
  }, [comments]);

  /**
   * When filtered comments change update the positive and negative comments
   */
  useEffect(() => {
    commentsFiltered && setPositiveComments(commentsFiltered[0].slice(0, 10));
    commentsFiltered && setNegativeComments(commentsFiltered[1].slice(0, 10));
  }, [commentsFiltered]);

  const loadMorePositive = () => {
    if (positiveComments !== undefined && commentsFiltered !== undefined) {
      let count = positiveComments.length + 5;
      if (count >= commentsFiltered[0].length) {
        setHasmoreItems(false);
        return;
      }
      setPositiveComments(commentsFiltered[0].slice(0, count));
    }
  };

  const loadMoreNegative = () => {
    if (negativeComments !== undefined && commentsFiltered !== undefined) {
      let count = negativeComments.length + 5;
      if (count >= commentsFiltered[1].length) {
        setHasmoreItems(false);
        return;
      }
      setNegativeComments(commentsFiltered[1].slice(0, count));
    }
  };

  if (!positiveComments || !negativeComments) return null;

  return (
    <div className="infinite-wrapper">
      <div className="infinite-scroll">
        <h2 className="infinite-scroll__heading">
          Selected positive sentiments:
        </h2>
        <InfiniteScroll
          className="infinite-scroll__wrapper"
          pageStart={0}
          loadMore={loadMorePositive}
          hasMore={hasmoreItems}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
          useWindow={false}
        >
          {positiveComments &&
            positiveComments.map((comment) => {
              return (
                <div className="comment" key={uuidv4()}>
                  <div className="comment__text">{`"${comment[0]}"`}</div>
                  <div className="comment__sentiment">
                    {comment[3].toString().slice(0, 6)}
                  </div>
                </div>
              );
            })}
        </InfiniteScroll>
      </div>
      <div className="infinite-scroll">
        <h2 className="infinite-scroll__heading">
          Selected negative sentiments:
        </h2>
        <InfiniteScroll
          className="infinite-scroll__wrapper"
          pageStart={0}
          loadMore={loadMoreNegative}
          hasMore={hasmoreItems}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
          useWindow={false}
        >
          {negativeComments &&
            negativeComments.map((comment) => {
              return (
                <div className="comment" key={uuidv4()}>
                  <div className="comment__text">{`"${comment[0]}"`}</div>
                  <div className="comment__sentiment">
                    {comment[3].toString().slice(0, 6)}
                  </div>
                </div>
              );
            })}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default InfiniteScrollWindow;
