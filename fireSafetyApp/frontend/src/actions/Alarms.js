import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_ALARM_SYS, DELETE_ALARM_SYS, ADD_ALARM_SYS, GET_AS_INSP, ADD_AS_INSP, UPDATE_ALARM_SYS } from './types';

// GET Alarm System
export const getAlarmSystem = () => (dispatch, getState) => {
  axios
    .get('/alarm_system', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ALARM_SYS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Alarm System by building id
export const getASByBuilding = (building_id) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.params = {};
  config.params.building = building_id;
  axios
    .get('/alarm_system', config)
    .then((res) => {
      dispatch({
        type: GET_ALARM_SYS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE Alarm System
export const deleteAlarmSystem = (id) => (dispatch, getState) => {
  axios
    .delete(`/alarm_system/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteAlarmSystem: 'Alarm System Deleted' }));
      dispatch({
        type: DELETE_ALARM_SYS,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD Alarm System
export const createAlarmSystem = (AlarmSys) => (dispatch, getState) => {
  let d;
  if (!AlarmSys.upcoming_monthly_inspection) {
    d = new Date();
    AlarmSys.upcoming_monthly_inspection = new Date(d.setMonth(d.getMonth()+1));
  }
  if (!AlarmSys.upcoming_semiannual_inspection) {
    d = new Date();
    AlarmSys.upcoming_semiannual_inspection = new Date(d.setFullYear(d.getFullYear()+1));
  }
  if (!AlarmSys.upcoming_annual_inspection) {
    d = new Date();
    AlarmSys.upcoming_annual_inspection = new Date(d.setFullYear(d.getFullYear()+1));
  }
  axios
    .post('/alarm_system/', AlarmSys, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addAlarmSys: 'Alarm System Added' }));
      dispatch({
        type: ADD_ALARM_SYS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// UPDATE Alarm System dates
export const updateASInspectionDate = (AS, i) => (dispatch, getState) => {
  let requestBody = {};
  let d = new Date(i.date_tested);
  if (i.inspection_type === "monthly") {
    requestBody.last_monthly_inspection = i.date_tested;
    requestBody.upcoming_monthly_inspection = new Date(d.setMonth(d.getMonth()+1));
  }
  else if (i.inspection_type === "semiannual") {
    requestBody.last_semiannual_inspection = i.date_tested;
    requestBody.upcoming_semiannual_inspection = new Date(d.setFullYear(d.getFullYear()+1));
  }
  else if (i.inspection_type === "annual") {
    requestBody.last_annual_inspection = i.date_tested;
    requestBody.upcoming_annual_inspection = new Date(d.setFullYear(d.getFullYear()+1));
  }
  axios
    .patch(`/alarm_system/${AS.id}/`, requestBody, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updateAS: 'Inspection Date Updated' }));
      dispatch({
        type: UPDATE_ALARM_SYS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Alarm System Inspections
export const getAlarmSysInspecsById = (as_id) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.params = {};
  config.params.alarm_system = as_id;
  axios
    .get('/alarmsys_insp', config)
    .then((res) => {
      dispatch({
        type: GET_AS_INSP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// CREATE Alarm System Inspections
export const createASInspection = (i) => (dispatch, getState) => {
  axios
    .post('/alarmsys_insp/', i, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addASInspection: 'Inspection Completed' }));
      dispatch({
        type: ADD_AS_INSP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
