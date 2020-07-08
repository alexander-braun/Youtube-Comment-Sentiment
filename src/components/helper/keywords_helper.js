const keyword_extractor = require('keyword-extractor');

/**
 * Counts Keywords for the bubblechart comparsion
 */
export const countKeywords = (keywords) => {
  // Get all the unique keywords
  const uniqueKeywords = [];
  for (let i = 0; i < keywords.length; i++) {
    for (const keyword of keywords[i]) {
      const word = keyword.toLowerCase();
      uniqueKeywords.indexOf(word) === -1 && uniqueKeywords.push(word);
    }
  }

  // Put all of them into an object an count them
  const keyCount = {};
  for (let i = 0; i < keywords.length; i++) {
    for (const keyword of keywords[i]) {
      keyCount[keyword] && keyCount[keyword]++;
      !keyCount[keyword] && (keyCount[keyword] = 1);
    }
  }
  return keyCount;
};

/**
 * Gets english lang keywords with the help of keywordextractor
 * from all the comments for the bubblechart
 */
export const getKeywordsFromComments = (comments) => {
  let keywords = [];
  for (let i = 0; i < comments.length; i++) {
    let extraction = keyword_extractor.extract(comments[i], {
      language: 'english',
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: false,
    });
    keywords.push(extraction);
  }
  return keywords;
};
