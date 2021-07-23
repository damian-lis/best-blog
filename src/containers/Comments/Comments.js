import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { SearchBar, Comment, QuantityChanger, Container, Select } from '/src/components';
import { checkIsFavorite, filterElements } from '/src/helpers';

const Comments = ({
  initialQuantity = 1,
  isFavoritesPage,
  withSelectOption,
  data = [],
  addFavoriteComment = () => {},
  removeFavoriteComment = () => {}
}) => {
  const [searchComment, setSearchComment] = useState('');
  const [quantity, setQuantity] = useState(initialQuantity);
  const [selectedComments, setSelectedComments] = useState('all');
  const { favoriteComments } = useSelector((state) => state.favoriteCommentsState);

  const selectOptionsData = [
    { value: 'all', label: 'Wszystkie komentarze' },
    { value: 'liked', label: 'Polubione komentarze' },
    { value: 'unliked', label: 'Niepolubione komentarze' }
  ];

  let filteredComments = filterElements(data, 'email', searchComment);

  if (withSelectOption) {
    switch (selectedComments) {
      case 'liked':
        filteredComments = filteredComments.filter((comment) =>
          checkIsFavorite(comment, favoriteComments)
        );
        break;

      case 'unliked':
        filteredComments = filteredComments.filter(
          (comment) => !checkIsFavorite(comment, favoriteComments)
        );

      default:
        break;
    }
  }

  const countedQuantity = quantity > filteredComments.length ? filteredComments.length : quantity;
  const reducedComments = filteredComments.slice(0, quantity);

  return (
    <Container base>
      <Container wrap style={{ marginBottom: 50 }}>
        <SearchBar commentsType small searchWord={searchComment} setSearchWord={setSearchComment} />
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
        maxSize={filteredComments.length}
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
