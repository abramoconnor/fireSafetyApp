import { GET_FE_INSP } from '../actions/types.js';

const initialState = {
  FEInspecs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FE_INSP:
      return {
        ...state,
        FEInspecs: action.payload,
      };
    default:
      return state;
  }
}