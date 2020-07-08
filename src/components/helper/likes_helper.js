/**
 * Takes the highest and lowest comments and gets the like count
 */
export const findLikesForHighestAndLowestComment = (
  highest,
  lowest,
  comments
) => {
  let highestCommentLikes = 0;
  let lowestCommentLikes = 0;
  for (const comment of comments) {
    if (comment[0] === highest[1]) {
      highestCommentLikes = comment[1];
    }
    if (comment[0] === lowest[1]) {
      lowestCommentLikes = comment[1];
    }
  }
  return [highestCommentLikes, lowestCommentLikes];
};
