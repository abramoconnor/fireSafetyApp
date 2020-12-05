import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_FEs, DELETE_FEs, ADD_FEs, GET_FE_INSP, ADD_FE_INSP, UPDATE_FE } from './types';

// GET all Fire Extinguishers
export const getFEs = () => (dispatch, getState) => {
  axios
    .get('/fire_extinguish', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_FEs,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Fire Extinguishers by building id
export const getFEsByBuilding = (building_id) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.params = {};
  config.params.building = building_id;
  axios
    .get('/fire_extinguish', config)
    .then((res) => {
      dispatch({
        type: GET_FEs,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE Fire Extinguisher
export const deleteFE = (id) => (dispatch, getState) => {
  axios
    .delete(`/fire_extinguish/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteFE: 'Fire Extinguisher Deleted' }));
      dispatch({
        type: DELETE_FEs,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD Fire Extinguisher
export const createFE = (FE) => (dispatch, getState) => {
  // If no upcoming dates are given, they autopopulate dates
  let d;
  if (!FE.upcoming_monthly_inspection) {
    d = new Date();
    FE.upcoming_monthly_inspection = new Date(d.setMonth(d.getMonth()+1));
  }

  if (!FE.upcoming_annual_inspection) {
    d = new Date();
    FE.upcoming_annual_inspection = new Date(d.setFullYear(d.getFullYear()+1));
  }
  
  if (!FE.upcoming_6year_service) {
    d = new Date();
    FE.upcoming_6year_service = new Date(d.setFullYear(d.getFullYear()+6));
  }
  
  if (!FE.upcoming_12year_test) {
    d = new Date();
    FE.upcoming_12year_test = new Date(d.setFullYear(d.getFullYear()+12));
  }
  axios
    .post('/fire_extinguish/', FE, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addFE: 'Fire Extinguisher Added' }));
      dispatch({
        type: ADD_FEs,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// UPDATE Fire Extinguisher dates
export const updateFEInspectionDate = (FE, i) => (dispatch, getState) => {
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
  else if (i.inspection_type === "6year") {
    requestBody.last_6year_service = i.date_tested;
    requestBody.upcoming_6year_service = new Date(d.setFullYear(d.getFullYear()+6));
  }
  else if (i.inspection_type === "12year") {
    requestBody.last_12year_test = i.date_tested;
    requestBody.upcoming_12year_test = new Date(d.setFullYear(d.getFullYear()+12));
  }
  axios
    .patch(`/fire_extinguish/${FE.id}/`, requestBody, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updateFE: 'Inspection Date Updated' }));
      dispatch({
        type: UPDATE_FE,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// UPDATE Fire Extinguisher dates
export const updateFELocation = (fe, requestBody, b) => (dispatch, getState) => {
  axios
    .patch(`/fire_extinguish/${fe.id}/`, requestBody, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ feTransfer: `Fire Extinguisher ${fe.exnum} transferred to ${b[0].name}` }));
      dispatch({
        type: UPDATE_FE,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET FE Inspections
export const getFEInspecsById = (fe_id) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.params = {};
  config.params.fire_extinguisher = fe_id;
  axios
    .get(`/fe_inspection`, config)
    .then((res) => {
      dispatch({
        type: GET_FE_INSP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// CREATE FE Inspections
export const createFEInspection = (i) => (dispatch, getState) => {
  axios
    .post('/fe_inspection/', i, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addFEInspection: 'Inspection Completed' }));
      dispatch({
        type: ADD_FE_INSP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

