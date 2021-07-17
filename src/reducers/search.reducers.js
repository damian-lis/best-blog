import { SEARCH } from '../constants/search.constants';

export const searchReducer = (state = '', action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        searchWord: action.payload,
      };

    default:
      return state;
  }
};
