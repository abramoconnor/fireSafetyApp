import { combineReducers } from 'redux';
import buildings from './buildings';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import FEs from './FEs'
import AEDs from './AEDs'

export default combineReducers({
  buildings,
  FEs,
  AEDs,
  errors,
  messages,
  auth,
});
