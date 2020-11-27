import { GET_SPRINKLER_INSP } from '../../actions/types.js';

const initialState = {
  SprinklerInspecs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SPRINKLER_INSP:
      return {
        ...state,
        SprinklerInspecs: action.payload,
      };
    default:
      return state;
  }
}