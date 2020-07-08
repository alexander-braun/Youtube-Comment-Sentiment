/**
 * Seperates the pure text from additional information wich are not needed in this step
 */
export const cleanComments = (comments) => {
  let cleanedComments = [];
  for (let i = 0; i < comments.length; i++) {
    cleanedComments.push(comments[i][0]);
  }
  return cleanedComments;
};
