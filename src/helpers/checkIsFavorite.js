const checkIsFavorite = (comment, favoriteComments) => {
  return favoriteComments.some((favoriteComment) => favoriteComment.id === comment.id);
};

export default checkIsFavorite;
