import { GET_SP_NOTES, ADD_SP_NOTES, DELETE_SP_NOTES } from '../../actions/types.js';

const initialState = {
  SSNotes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SP_NOTES:
      return {
        ...state,
        SSNotes: action.payload,
      };
    case ADD_SP_NOTES:
      return {
        ...state,
        SSNotes: [...state.SSNotes, action.payload],
      };
      case DELETE_SP_NOTES:
        return {
          ...state,
          SSNotes: state.SSNotes.filter((n) => n.id !== action.payload),
        };
    default:
      return state;
  }
}