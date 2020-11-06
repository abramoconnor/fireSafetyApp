import { GET_SPRINKLERs, DELETE_SPRINKLERs, ADD_SPRINKLERs, CLEAR_SPRINKLERs } from '../actions/types.js';

const initialState = {
  SPRINKLERs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SPRINKLERs:
      return {
        ...state,
        SPRINKLERs: action.payload,
      };
    case DELETE_SPRINKLERs:
      return {
        ...state,
        SPRINKLERs: state.SPRINKLERs.filter((SPRINKLER) => SPRINKLER.id !== action.payload),
      };
    case ADD_SPRINKLERs:
      return {
        ...state,
        SPRINKLERs: [...state.SPRINKLERs, action.payload],
      };
    case CLEAR_SPRINKLERs:
      return {
        ...state,
        SPRINKLERs: [],
      };
    default:
      return state;
  }
}
