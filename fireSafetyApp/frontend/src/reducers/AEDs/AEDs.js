import { GET_AEDs, DELETE_AEDs, ADD_AEDs, UPDATE_AED, } from '../../actions/types.js';

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
        AEDs: state.AEDs.filter((a) => a.id !== action.payload),
      };
    case ADD_AEDs:
      return {
        ...state,
        AEDs: [...state.AEDs, action.payload],
      };
    case UPDATE_AED:
      return {
        ...state,
        AEDs: state.AEDs.map((a) => {
          if (a.id === action.payload.id) {
            return action.payload;
          } else return a;
        })
      };
    default:
      return state;
  }
}
