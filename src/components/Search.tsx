import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { AppState } from '../reducers';

//MUI
import SearchIcon from '@material-ui/icons/Search';

//Actions
import { setKeycounts } from '../actions/setKeycounts';
import { setVideoTitle } from '../actions/setVideoTitle';
import { setComments } from '../actions/setComments';
import { setHighestAndLowestCommentCount } from '../actions/setHighestAndLowestCommentCount';
import { toggleNoCommentsModal } from '../actions/toggleNoCommentsModal';
import {
  setHighestSingleWords,
  setLowestSingleWords,
} from '../actions/setSingleWordSentiments';
import {
  setSentiment,
  setSentimentCount,
  setHighestComment,
  setLowestComment,
  setCommentCount,
} from '../actions/setSentiments';

//Helper
import { getKeywordsFromComments } from './helper/keywords_helper';
import { countKeywords } from './helper/keywords_helper';
import { findLikesForHighestAndLowestComment } from './helper/likes_helper';
import { sentiments } from './helper/sentiments_helper';
import { fetchComments } from './helper/fetchComments_helper';
import { fetchVideoTitle } from './helper/fetchVideoTitle_helper';
import { cleanComments } from './helper/cleanComments_helper';
import { shoertenToVideoID } from './helper/shoertenToVideoID_helper';

//Assets
import { SearchStyles } from './SearchStyles';

//Components
import NoCommentsModal from './NoCommentsModal';

interface Props {
  noCommentsModal: boolean;
}

function Search(props: Props) {
  const noCommentsModal = props.noCommentsModal;
  const [videoLink, updateVideoLink] = useState<string>('');
  const [videoID, updateVideoID] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    // Get and Update Video ID when videoLink updates
    const ID = shoertenToVideoID(videoLink);
    updateVideoID(ID);
  }, [videoLink]);

  // Main knot to get all needed information from the api
  const getSearchResults = async (e: React.MouseEvent) => {
    e.preventDefault();
    // Get and set Video Title
    if (videoID !== undefined) {
      let videoTitle: string | null = await fetchVideoTitle(videoID);
      if (videoTitle !== null) {
        dispatch(setVideoTitle(videoTitle));
      }
    } else return null;
    // Get last 100 comments (YT always returns 100 if there are at least 100 comments)
    let comments = await fetchComments(videoID);
    //Method returns false when comments are deactivated
    if (!comments || comments.length === 0) {
      return dispatch(toggleNoCommentsModal());
    }
    if (comments.length === 0) return;
    comments = comments.flat();
    dispatch(setComments(comments));

    // Extract pure comments from [comment, likes, id]
    let cleanedComments = cleanComments(comments);
    let commentCount = cleanedComments.length;
    dispatch(setCommentCount(commentCount));

    // Calculate the sentiment and update
    let sentimentCollector = sentiments(cleanedComments);
    dispatch(setSentiment(sentimentCollector[0]));
    dispatch(setSentimentCount(sentimentCollector[1]));
    dispatch(setHighestComment(sentimentCollector[2]));
    dispatch(setLowestComment(sentimentCollector[3]));
    dispatch(setLowestSingleWords(sentimentCollector[4]));
    dispatch(setHighestSingleWords(sentimentCollector[5]));

    // Get and set the likes for the highest and lowest sentiment comments
    let likes = findLikesForHighestAndLowestComment(
      sentimentCollector[2],
      sentimentCollector[3],
      comments
    );
    dispatch(setHighestAndLowestCommentCount(likes));

    // Get all the keywords from all the comments and count them
    let keywords = getKeywordsFromComments(cleanedComments);
    let uniqueKeywordCounts = countKeywords(keywords);
    dispatch(setKeycounts(uniqueKeywordCounts));
  };

  const classes = SearchStyles();
  return (
    <div className="search">
      <form className="search__form">
        <input
          placeholder="Enter Youtube Video Link..."
          type="text"
          id="video-link"
          name="video-link"
          onChange={(e) => updateVideoLink(e.target.value)}
          value={videoLink}
          className="search__link-input"
        />
        <SearchIcon className={classes.searchIcon} onClick={getSearchResults} />
      </form>
      <button
        onClick={getSearchResults}
        value="Search"
        className="search__button"
      >
        Search
      </button>
      {noCommentsModal && <NoCommentsModal />}
    </div>
  );
}

interface StateProps {
  noCommentsModal: boolean;
}

const mapStateToProps = (state: AppState): StateProps => ({
  noCommentsModal: state.noCommentsModal,
});

export default connect(mapStateToProps)(Search);
