import { combineReducers } from 'redux';
import buildings from './buildings';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import FEs from './FEs';
import AEDs from './AEDs';
import SPRINKLERs from './Sprinklers';
import ALARMs from './Alarms';
import FEInspecs from './FEInsp';
import AlarmInspecs from "./AlarmInsp";
import SprinklerInspecs from "./SprinklerInsp";
import AEDInspecs from "./AEDInsp";

export default combineReducers({
  buildings,
  FEs,
  FEInspecs,
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
