import { GET_ALARM_SYS, DELETE_ALARM_SYS, ADD_ALARM_SYS, UPDATE_ALARM_SYS } from '../../actions/types.js';

const initialState = {
  AlarmSystems: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALARM_SYS:
      return {
        ...state,
        AlarmSystems: action.payload,
      };
    case DELETE_ALARM_SYS:
      return {
        ...state,
        AlarmSystems: state.AlarmSystems.filter((system) => system.id !== action.payload),
      };
    case ADD_ALARM_SYS:
      return {
        ...state,
        AlarmSystems: [...state.AlarmSystems, action.payload],
      };
      case UPDATE_ALARM_SYS:
        return {
          ...state,
          AlarmSystems: state.AlarmSystems.map((system) => {
            if (system.id === action.payload.id) {
              return action.payload;
            } else return system;
          })
        };
    default:
      return state;
  }
}
