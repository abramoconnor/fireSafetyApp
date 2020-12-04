import { GET_PUMP_INSP, ADD_PUMP_INSP } from '../../actions/types.js';

const initialState = {
    PumpInspecs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PUMP_INSP:
      return {
        ...state,
        PumpInspecs: action.payload,
      };
      case ADD_PUMP_INSP:
        return {
          ...state,
          PumpInspecs: [...state.PumpInspecs, action.payload],
        };
    default:
      return state;
  }
}