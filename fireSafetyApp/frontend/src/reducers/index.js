import { combineReducers } from 'redux';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import buildings from './buildings';
import FEs from './FireExtinguishers/FEs';
import FEInspecs from './FireExtinguishers/FEInsp';
import FENotes from "./FireExtinguishers/FENotes"
import AEDs from './AEDs/AEDs';
import AEDInspecs from "./AEDs/AEDInsp";
import ALARMs from './Alarms/Alarms';
import AlarmInspecs from "./Alarms/AlarmInsp";
import SPRINKLERs from './Sprinklers/Sprinklers';
import SprinklerInspecs from "./Sprinklers/SprinklerInsp";

export default combineReducers({
  buildings,
  FEs,
  FEInspecs,
  FENotes,
  AEDs,
  AEDInspecs,
  SPRINKLERs,
  SprinklerInspecs,
  ALARMs,
  AlarmInspecs,
  errors,
  messages,
  auth,
});
