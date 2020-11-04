import { combineReducers } from 'redux';
import leads from './leads';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import FEs from './FEs'

export default combineReducers({
  leads,
  FEs,
  errors,
  messages,
  auth,
});
