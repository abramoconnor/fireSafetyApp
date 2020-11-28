import { GET_AS_NOTES, ADD_AS_NOTES, DELETE_AS_NOTES } from '../../actions/types.js';

const initialState = {
  ASNotes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AS_NOTES:
      return {
        ...state,
        ASNotes: action.payload,
      };
    case ADD_AS_NOTES:
      return {
        ...state,
        ASNotes: [...state.ASNotes, action.payload],
      };
      case DELETE_AS_NOTES:
        return {
          ...state,
          ASNotes: state.ASNotes.filter((n) => n.id !== action.payload),
        };
    default:
      return state;
  }
}