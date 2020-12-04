import { GET_AED_INSP, ADD_AED_INSP } from '../../actions/types.js';

const initialState = {
  AEDInspecs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AED_INSP:
      return {
        ...state,
        AEDInspecs: action.payload,
      };
    case ADD_AED_INSP:
      return {
        ...state,
        AEDInspecs: [...state.AEDInspecs, action.payload],
      };
    default:
      return state;
  }
}