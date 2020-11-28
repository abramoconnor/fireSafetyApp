import { GET_AS_INSP, ADD_AS_INSP } from '../../actions/types.js';

const initialState = {
    AlarmSysInspecs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AS_INSP:
      return {
        ...state,
        AlarmSysInspecs: action.payload,
      };
      case ADD_AS_INSP:
        return {
          ...state,
          AlarmSysInspecs: [...state.AlarmSysInspecs, action.payload],
        };
    default:
      return state;
  }
}