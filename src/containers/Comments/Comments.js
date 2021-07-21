import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Comment from '../../components/Comment';
import QuantityChanger from '../../components/QuantityChanger';
import Container from '../../components/Container';
import './comments.css';
import Select from '../../components/Select';

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
          <Select value={selectedComments} setSelect={setSelectedComments} />
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
