import { GET_BUILDINGS, DELETE_BUILDING, ADD_BUILDING } from '../actions/types.js';

const initialState = {
  buildings: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BUILDINGS:
      return {
        ...state,
        buildings: action.payload,
      };
    case DELETE_BUILDING:
      return {
        ...state,
        buildings: state.buildings.filter((building) => building.id !== action.payload),
      };
    case ADD_BUILDING:
      return {
        ...state,
        buildings: [...state.buildings, action.payload],
      };
    default:
      return state;
  }
}
