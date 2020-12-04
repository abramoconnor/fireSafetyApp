import { GET_PUMP_NOTES, ADD_PUMP_NOTES, DELETE_PUMP_NOTES } from '../../actions/types.js';

const initialState = {
  PumpNotes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PUMP_NOTES:
      return {
        ...state,
        PumpNotes: action.payload,
      };
    case ADD_PUMP_NOTES:
      return {
        ...state,
        PumpNotes: [...state.PumpNotes, action.payload],
      };
      case DELETE_PUMP_NOTES:
        return {
          ...state,
          PumpNotes: state.PumpNotes.filter((n) => n.id !== action.payload),
        };
    default:
      return state;
  }
}