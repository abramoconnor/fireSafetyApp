import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_AEDs, DELETE_AEDs, ADD_AEDs, GET_AED_INSP, ADD_AED_INSP, UPDATE_AED } from './types';

// GET all Fire Extinguishers
export const getAEDs = () => (dispatch, getState) => {
  axios
    .get('/AEDs', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_AEDs,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Fire Extinguishers by building id
export const getAEDsByBuilding = (building_id) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.params = {};
  config.params.building = building_id;
  axios
    .get('/AEDs', config)
    .then((res) => {
      dispatch({
        type: GET_AEDs,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE Fire Extinguisher
export const deleteAED = (id) => (dispatch, getState) => {
  axios
    .delete(`/AEDs/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteAED: 'AED Deleted' }));
      dispatch({
        type: DELETE_AEDs,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD Fire Extinguisher
export const createAED = (AED) => (dispatch, getState) => {
  // If no upcoming dates are given, they autopopulate dates
  let d;
  if (!AED.upcoming_monthly_inspection) {
    d = new Date();
    AED.upcoming_monthly_inspection = new Date(d.setMonth(d.getMonth()+1));
  }

  if (!AED.upcoming_annual_inspection) {
    d = new Date();
    AED.upcoming_annual_inspection = new Date(d.setFullYear(d.getFullYear()+1));
  }
  
  if (!AED.upcoming_6year_service) {
    d = new Date();
    AED.upcoming_6year_service = new Date(d.setFullYear(d.getFullYear()+6));
  }
  
  if (!AED.upcoming_12year_test) {
    d = new Date();
    AED.upcoming_12year_test = new Date(d.setFullYear(d.getFullYear()+12));
  }
  axios
    .post('/AEDs/', AED, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addAED: 'Fire Extinguisher Added' }));
      dispatch({
        type: ADD_AEDs,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// UPDATE Fire Extinguisher dates
export const updateAEDInspectionDate = (AED, i) => (dispatch, getState) => {
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
    .patch(`/AEDs/${AED.id}/`, requestBody, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updateAED: 'Fire Extinguisher Updated' }));
      dispatch({
        type: UPDATE_AED,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// UPDATE Fire Extinguisher dates
export const updateAEDLocation = (AED, requestBody, b) => (dispatch, getState) => {
  axios
    .patch(`/AEDs/${AED.id}/`, requestBody, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ AEDTransAEDr: `AED ${AED.exnum} transAEDrred to ${b[0].name}` }));
      dispatch({
        type: UPDATE_AED,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET AED Inspections
export const getAEDInspecsById = (AED_id) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.params = {};
  config.params.fire_extinguisher = AED_id;
  axios
    .get(`/AED_inspection`, config)
    .then((res) => {
      dispatch({
        type: GET_AED_INSP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// CREATE AED Inspections
export const createAEDInspection = (i) => (dispatch, getState) => {
  axios
    .post('/AED_inspection/', i, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addAEDInspection: 'Inspection Completed' }));
      dispatch({
        type: ADD_AED_INSP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

