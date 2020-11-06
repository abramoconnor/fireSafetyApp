import { GET_ALARM_INSP } from '../actions/types.js';

const initialState = {
    AlarmInspecs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALARM_INSP:
      return {
        ...state,
        AlarmInspecs: action.payload,
      };
    default:
      return state;
  }
}