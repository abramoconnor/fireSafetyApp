import { GET_SP_INSP, ADD_SP_INSP } from '../../actions/types.js';

const initialState = {
  SSInspecs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SP_INSP:
      return {
        ...state,
        SSInspecs: action.payload,
      };
    case ADD_SP_INSP:
      return {
        ...state,
        SSInspecs: [...state.SSInspecs, action.payload],
      };
    default:
      return state;
  }
}