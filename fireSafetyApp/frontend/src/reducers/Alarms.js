import { GET_ALARMs, DELETE_ALARMs, ADD_ALARMs, CLEAR_ALARMs } from '../actions/types.js';

const initialState = {
  ALARMs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALARMs:
      return {
        ...state,
        ALARMs: action.payload,
      };
    case DELETE_ALARMs:
      return {
        ...state,
        ALARMs: state.ALARMs.filter((ALARM) => ALARM.id !== action.payload),
      };
    case ADD_ALARMs:
      return {
        ...state,
        ALARMs: [...state.ALARMs, action.payload],
      };
    case CLEAR_ALARMs:
      return {
        ...state,
        ALARMs: [],
      };
    default:
      return state;
  }
}
