import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_PUMP, DELETE_PUMP, ADD_PUMP, GET_PUMP_INSP, ADD_PUMP_INSP, UPDATE_PUMP } from './types';

// GET All Pumps
export const getPumps = () => (dispatch, getState) => {
  axios
    .get('/fire_pump', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_PUMP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Pumps by building id
export const getPumpByBuilding = (building_id) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.params = {};
  config.params.building = building_id;
  axios
    .get('/fire_pump', config)
    .then((res) => {
      dispatch({
        type: GET_PUMP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE Pump
export const deletePump = (id) => (dispatch, getState) => {
  axios
    .delete(`/fire_pump/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deletePump: 'Fire Pump Deleted' }));
      dispatch({
        type: DELETE_PUMP,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD Pump
export const createPump = (p) => (dispatch, getState) => {
  let d;
  if (!p.upcoming_monthly_inspection) {
    d = new Date();
    p.upcoming_monthly_inspection = new Date(d.setMonth(d.getMonth()+1));
  }
  if (!p.upcoming_annual_inspection) {
    d = new Date();
    p.upcoming_annual_inspection = new Date(d.setFullYear(d.getFullYear()+1));
  }
  axios
    .post('/fire_pump/', p, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addPump: 'Fire Pump Added' }));
      dispatch({
        type: ADD_PUMP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// UPDATE Pump dates
export const updatePumpInspectionDate = (p, i) => (dispatch, getState) => {
  let requestBody = {};
  let d = new Date(i.date_tested);
  if (i.inspection_type === "monthly") {
    requestBody.last_monthly_inspection = i.date_tested;
    requestBody.upcoming_monthly_inspection = new Date(d.setMonth(d.getMonth()+1));
  }
  else if (i.inspection_type === "annual") {
    requestBody.last_annual_inspection = i.date_tested;
    requestBody.upcoming_annual_inspection = new Date(d.setFullYear(d.getFullYear()+1));
  }
  axios
    .patch(`/fire_pump/${p.id}/`, requestBody, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updatePump: 'Inspection Date Updated' }));
      dispatch({
        type: UPDATE_PUMP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Pump Inspections
export const getPumpInspecsById = (p_id) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.params = {};
  config.params.fire_pump = p_id;
  axios
    .get('/pump_insp', config)
    .then((res) => {
      dispatch({
        type: GET_PUMP_INSP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// CREATE Pump Inspections
export const createPumpInspection = (i) => (dispatch, getState) => {
  axios
    .post('/pump_insp/', i, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addPumpInspection: 'Inspection Completed' }));
      dispatch({
        type: ADD_PUMP_INSP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
