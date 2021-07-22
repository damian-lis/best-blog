import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { SearchBar, Comment, QuantityChanger, Container, Select } from '/src/components';
import { checkIsFavorite } from '/src/helpers';

const Comments = ({
  addFavoriteComment = () => {},
  removeFavoriteComment = () => {},
  data = [],
  initialQuantity = 1,
  isFavoritesPage,
  withSelectOption
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [selectedComments, setSelectedComments] = useState('all');

  const { favoriteComments } = useSelector((state) => state.favoriteCommentsState);

  const selectOptionsData = [
    { value: 'all', label: 'Wszystkie komentarze' },
    { value: 'liked', label: 'Polubione komentarze' },
    { value: 'unliked', label: 'Niepolubione komentarze' }
  ];

  let comments = data;

  if (withSelectOption) {
    switch (selectedComments) {
      case 'liked':
        comments = comments.filter((comment) => checkIsFavorite(comment, favoriteComments));
        break;

      case 'unliked':
        comments = comments.filter((comment) => !checkIsFavorite(comment, favoriteComments));

      default:
        break;
    }
  }

  const countedQuantity = quantity > comments.length ? comments.length : quantity;
  const reducedComments = comments.slice(0, quantity);

  return (
    <Container base>
      <Container wrap style={{ marginBottom: 50 }}>
        <SearchBar commentsType small />
        {withSelectOption && (
          <Select
            value={selectedComments}
            setSelect={setSelectedComments}
            selectOptions={selectOptionsData}
          />
        )}
      </Container>
      <Container column>
        {reducedComments.map((comment, index) => (
          <Comment
            key={index}
            data={comment}
            isFavoriteComment={checkIsFavorite(comment, favoriteComments)}
            isFavoritesPage={isFavoritesPage}
            addFavoriteComment={addFavoriteComment}
            removeFavoriteComment={removeFavoriteComment}
          />
        ))}
      </Container>
      <QuantityChanger
        rangeSize={5}
        maxSize={comments.length}
        quantity={countedQuantity}
        setQuantity={setQuantity}
      />
    </Container>
  );
};

Comments.propTypes = {
  addToFavorites: PropTypes.func,
  removeFromFavorites: PropTypes.func,
  data: PropTypes.array.isRequired,
  initialQuantity: PropTypes.number.isRequired,
  isFavoritesPage: PropTypes.bool,
  selectOption: PropTypes.bool
};

export default Comments;
