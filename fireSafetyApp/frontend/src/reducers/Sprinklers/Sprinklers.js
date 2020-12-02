import { GET_SP_SYS, ADD_SP_SYS, DELETE_SP_SYS, UPDATE_SP_SYS } from '../../actions/types.js';

const initialState = {
  SprinklerSystems: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SP_SYS:
      return {
        ...state,
        SprinklerSystems: action.payload,
      };
    case DELETE_SP_SYS:
      return {
        ...state,
        SprinklerSystems: state.SprinklerSystems.filter((s) => s.id !== action.payload),
      };
    case ADD_SP_SYS:
      return {
        ...state,
        SprinklerSystems: [...state.SprinklerSystems, action.payload],
      };
    case UPDATE_SP_SYS:
    return {
      ...state,
      SprinklerSystems: state.SprinklerSystems.map((s) => {
        if (s.id === action.payload.id) {
          return action.payload;
        } else return s;
      })
    };
    default:
      return state;
  }
}
