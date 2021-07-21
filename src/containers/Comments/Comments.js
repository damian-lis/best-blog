import React, { useState } from 'react';
import {
  SearchBar,
  Comment,
  QuantityChanger,
  Container,
  Select,
} from '../../components';

const Comments = ({
  addToFavorite,
  removeFromFavorite,
  data,
  initialQuantity,
  favoritePage,
  selectOption,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [selectedComments, setSelectedComments] = useState('all');

  const selectOptions = [
    { value: 'all', label: 'Wszystkie komentarze' },
    { value: 'liked', label: 'Polubione komentarze' },
    { value: 'unliked', label: 'Niepolubione komentarze' },
  ];

  let comments = data;

  if (selectOption)
    if (selectedComments === 'liked') {
      comments = comments.filter((comment) => comment.like);
    }

  if (selectedComments === 'unliked') {
    comments = comments.filter((comment) => !comment.like);
  }

  const countQuantity = quantity > comments.length ? comments.length : quantity;
  const reducedComments = comments.slice(0, quantity);

  return (
    <Container base>
      <Container wrap style={{ marginBottom: 50 }}>
        <SearchBar comments small />
        {selectOption && (
          <Select
            value={selectedComments}
            setSelect={setSelectedComments}
            selectOptions={selectOptions}
          />
        )}
      </Container>
      <Container column>
        {reducedComments.map((comment, index) => (
          <Comment
            key={index}
            comment={comment}
            favoritePage={favoritePage}
            addLike={addToFavorite}
            removeLike={removeFromFavorite}
          />
        ))}
      </Container>
      <QuantityChanger
        rangeSize={1}
        maxSize={comments.length}
        quantity={countQuantity}
        setQuantity={setQuantity}
      />
    </Container>
  );
};

export default Comments;
