/**
 * Prefilter the comments into positive and negative comments
 * Makes the sorting easier later
 */
export const filterComments = (comments) => {
  let positive = [];
  let negative = [];
  for (let comment of comments) {
    if (comment[3] > 0) {
      positive.push(comment);
    } else if (comment[3] < 0) {
      negative.push(comment);
    }
  }

  positive = sortCommentsBySentiment(positive, '+');
  negative = sortCommentsBySentiment(negative, '-');

  return [positive, negative];
};

// Sort the comments by sentiment value
const sortCommentsBySentiment = (comments, indicator) => {
  let sorted = [];
  let values = [];

  // Give the comments ID's for later identification
  let index = 0;
  for (let comment of comments) {
    comment.push(index);
    index++;
  }

  // Get all the sentiment-values
  for (let comment of comments) {
    values.push(comment[3]);
  }

  // Sort all the sentiment values
  if (indicator === '+') {
    values = values.sort((a, b) => a - b).reverse();
  } else {
    values = values.sort((a, b) => a - b);
  }

  /**
   * Go through the values and find their belonging comment - if the
   * index is already used, continue searching for the belonging value
   */
  const usedIndexes = [];
  for (let value of values) {
    for (let comment of comments) {
      if (comment[3] === value && usedIndexes.indexOf(comment[5]) === -1) {
        sorted.push(comment);
        usedIndexes.push(comment[5]);
        break;
      }
    }
  }

  return sorted;
};
