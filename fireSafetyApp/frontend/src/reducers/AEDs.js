import { GET_AEDs, DELETE_AEDs, ADD_AEDs, CLEAR_AEDs } from '../actions/types.js';

const initialState = {
  AEDs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AEDs:
      return {
        ...state,
        AEDs: action.payload,
      };
    case DELETE_AEDs:
      return {
        ...state,
        AEDs: state.AEDs.filter((AED) => AED.id !== action.payload),
      };
    case ADD_AEDs:
      return {
        ...state,
        AEDs: [...state.AEDs, action.payload],
      };
    case CLEAR_AEDs:
      return {
        ...state,
        AEDs: [],
      };
    default:
      return state;
  }
}
