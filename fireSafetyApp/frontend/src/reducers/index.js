import { combineReducers } from 'redux';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import buildings from './buildings';
import FEs from './FireExtinguishers/FEs';
import FEInspecs from './FireExtinguishers/FEInsp';
import FENotes from "./FireExtinguishers/FENotes"
import ALARMs from './Alarms/Alarms';
import AlarmInspecs from './Alarms/AlarmInsp';
import AlarmNotes from "./Alarms/AlarmNotes"
import SPRINKLERs from './Sprinklers/Sprinklers';
import SprinklerInspecs from './Sprinklers/SprinklerInsp';
import SprinklerNotes from "./Sprinklers/SprinklerNotes"
import AEDs from './AEDs/AEDs';
import AEDInspecs from "./AEDs/AEDInsp";
import AEDNotes from "./AEDs/AEDNotes";
import Pumps from './Pumps/Pumps';
import PumpInsp from './Pumps/PumpInsp';
import PumpNotes from "./Pumps/PumpNotes"

export default combineReducers({
  buildings,
  FEs,
  FEInspecs,
  FENotes,
  ALARMs,
  AlarmInspecs,
  AlarmNotes,
  AEDs,
  AEDInspecs,
  AEDNotes,
  SPRINKLERs,
  SprinklerInspecs,
  SprinklerNotes,
  Pumps,
  PumpInsp,
  PumpNotes,
  errors,
  messages,
  auth,
});
