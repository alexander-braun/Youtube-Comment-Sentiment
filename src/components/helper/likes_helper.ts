/**
 * Takes the highest and lowest comments and gets the like count
 */

type comment = [number, string];

type comments = [string, number, string, number, string, number?][];

export const findLikesForHighestAndLowestComment = (
  highest: comment,
  lowest: comment,
  comments: comments
): [number, number] => {
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
