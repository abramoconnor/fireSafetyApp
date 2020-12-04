import { GET_AED_NOTES, ADD_AED_NOTES, DELETE_AED_NOTES } from '../../actions/types.js';

const initialState = {
  AEDNotes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AED_NOTES:
      return {
        ...state,
        AEDNotes: action.payload,
      };
    case ADD_AED_NOTES:
      return {
        ...state,
        AEDNotes: [...state.AEDNotes, action.payload],
      };
      case DELETE_AED_NOTES:
        return {
          ...state,
          AEDNotes: state.AEDNotes.filter((n) => n.id !== action.payload),
        };
    default:
      return state;
  }
}