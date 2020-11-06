import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_ALARMs, DELETE_ALARMs, ADD_ALARMs, GET_ALARM_INSP } from './types';

// GET ALARMs
export const getALARMs = () => (dispatch, getState) => {
  axios
    .get('/alarms', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ALARMs,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE ALARMs
export const deleteALARMs = (id) => (dispatch, getState) => {
  axios
    .delete(`/alarms/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteALARMs: 'ALARM Deleted' }));
      dispatch({
        type: DELETE_ALARMs,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD ALARMs
export const addALARMs = (ALARM) => (dispatch, getState) => {
  axios
    .post('/alarms', ALARM, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addALARM: 'ALARM Added' }));
      dispatch({
        type: ADD_ALARMs,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Alarm Inspections
export const getAlarmInspecs = () => (dispatch, getState) => {
  axios
    .get('/alarm_inspection', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ALARM_INSP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
