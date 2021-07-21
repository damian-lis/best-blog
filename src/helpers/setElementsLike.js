const setElementsLike = (post, comments, favoriteComments) => {
  return comments.map((comment) => {
    const isCommentLiked = favoriteComments.some(
      (favoriteComment) => favoriteComment.postId === post.id && favoriteComment.id === comment.id
    );
    comment.like = isCommentLiked ? true : false;

    return comment;
  });
};

export default setElementsLike;
