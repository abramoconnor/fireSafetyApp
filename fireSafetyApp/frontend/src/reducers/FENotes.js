import { GET_FE_NOTES, ADD_FE_NOTES } from '../actions/types.js';

const initialState = {
  FENotes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FE_NOTES:
      return {
        ...state,
        FENotes: action.payload,
      };
    case ADD_FE_NOTES:
      return {
        ...state,
        FENotes: [...state.FENotes, action.payload],
      };
    default:
      return state;
  }
}