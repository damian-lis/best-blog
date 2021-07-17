import { SEARCH } from '../constants/search.constants';

export const search = (word) => (dispatch) => {
  dispatch({ type: SEARCH, payload: word });
};
