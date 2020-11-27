import { GET_FEs, DELETE_FEs, ADD_FEs, CLEAR_FEs, UPDATE_FE } from '../../actions/types';

const initialState = {
  FEs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FEs:
      return {
        ...state,
        FEs: action.payload,
      };
    case DELETE_FEs:
      return {
        ...state,
        FEs: state.FEs.filter((FE) => FE.id !== action.payload),
      };
    case ADD_FEs:
      return {
        ...state,
        FEs: [...state.FEs, action.payload],
      };
    case UPDATE_FE:
      return {
        ...state,
        FEs: state.FEs.map((FE) => {
          if (FE.id === action.payload.id) {
            return action.payload;
          } else return FE;
        })
      }
    case CLEAR_FEs:
      return {
        ...state,
        FEs: [],
      };
    default:
      return state;
  }
}
