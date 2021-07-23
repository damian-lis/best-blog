import { SEARCH_WORD } from '/src/constants/search.constants';

export const setSearchWord = (word) => (dispatch) => {
  dispatch({ type: SEARCH_WORD, payload: word });
};
