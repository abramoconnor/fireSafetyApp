import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_SP_SYS, DELETE_SP_SYS, ADD_SP_SYS, UPDATE_SP_SYS, GET_SP_INSP, ADD_SP_INSP } from './types';

// GET Sprinkler Systems
export const getSprinklerSystems = () => (dispatch, getState) => {
  axios
    .get('/ss', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_SP_SYS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Sprinkler System by building id
export const getSpSysByBuilding = (building_id) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.params = {};
  config.params.building = building_id;
  axios
    .get('/ss', config)
    .then((res) => {
      dispatch({
        type: GET_SP_SYS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE Sprinkler System
export const deleteSprinklerSystem = (id) => (dispatch, getState) => {
  axios
    .delete(`/ss/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteSprinklerSystem: 'Sprinkler System Deleted' }));
      dispatch({
        type: DELETE_SP_SYS,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// CREATE Sprinkler System
export const createSprinklerSystem = (SprinklerSys) => (dispatch, getState) => {
  let d;
  if (!SprinklerSys.upcoming_weekly_inspection) {
    d = new Date();
    SprinklerSys.upcoming_weekly_inspection = new Date(d.setDate(d.getDate()+7));
  }
  if (!SprinklerSys.upcoming_monthly_inspection) {
    d = new Date();
    SprinklerSys.upcoming_monthly_inspection = new Date(d.setMonth(d.getMonth()+1));
  }
  if (!SprinklerSys.upcoming_quarterly_inspection) {
    d = new Date();
    SprinklerSys.upcoming_quarterly_inspection = new Date(d.setMonth(d.getMonth()+3));
  }
  if (!SprinklerSys.upcoming_semiannual_inspection) {
    d = new Date();
    SprinklerSys.upcoming_semiannual_inspection = new Date(d.setFullYear(d.getFullYear()+1));
  }
  if (!SprinklerSys.upcoming_annual_inspection) {
    d = new Date();
    SprinklerSys.upcoming_annual_inspection = new Date(d.setFullYear(d.getFullYear()+1));
  }
  axios
    .post('/ss/', SprinklerSys, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addSprinklerSystem: 'Sprinkler System Added' }));
      dispatch({
        type: ADD_SP_SYS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// UPDATE Sprinkler System dates
export const updateSSInspectionDate = (ss, i) => (dispatch, getState) => {
  let requestBody = {};
  let d = new Date(i.date_tested);
  if (i.inspection_type === "weekly") {
    requestBody.last_weekly_inspection = i.date_tested;
    requestBody.upcoming_weekly_inspection = new Date(d.setDate(d.getDate()+7));
  }
  if (i.inspection_type === "monthly") {
    requestBody.last_monthly_inspection = i.date_tested;
    requestBody.upcoming_monthly_inspection = new Date(d.setMonth(d.getMonth()+1));
  }
  if (i.inspection_type === "quarterly") {
    requestBody.last_quarterly_inspection = i.date_tested;
    requestBody.upcoming_quarterly_inspection = new Date(d.setMonth(d.getMonth()+3));
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
    .patch(`/ss/${ss.id}/`, requestBody, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updateSS: 'Inspection Date Updated' }));
      dispatch({
        type: UPDATE_SP_SYS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Sprinkler System Inspections
export const getSprinklerSysInspecs = (ss_id) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.params = {};
  config.params.sprinkler_system = ss_id;
  axios
    .get('/ss/inspection/', config)
    .then((res) => {
      dispatch({
        type: GET_SP_INSP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// CREATE Sprinkler System Inspections
export const createSSInspection = (i) => (dispatch, getState) => {
  axios
    .post('/ss/inspection/', i, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addSSInspection: 'Inspection Completed' }));
      dispatch({
        type: ADD_SP_INSP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};