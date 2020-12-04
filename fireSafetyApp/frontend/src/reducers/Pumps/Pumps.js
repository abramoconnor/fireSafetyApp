import { GET_PUMP, DELETE_PUMP, ADD_PUMP, UPDATE_PUMP } from '../../actions/types.js';

const initialState = {
  Pumps: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PUMP:
      return {
        ...state,
        Pumps: action.payload,
      };
    case DELETE_PUMP:
      return {
        ...state,
        Pumps: state.Pumps.filter((p) => p.id !== action.payload),
      };
    case ADD_PUMP:
      return {
        ...state,
        Pumps: [...state.Pumps, action.payload],
      };
      case UPDATE_PUMP:
        return {
          ...state,
          Pumps: state.Pumps.map((p) => {
            if (p.id === action.payload.id) {
              return action.payload;
            } else return p;
          })
        };
    default:
      return state;
  }
}
