import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_AEDs, DELETE_AEDs, ADD_AEDs, GET_AED_INSP, ADD_AED_INSP, UPDATE_AED } from './types';

// GET all AEDs
export const getAEDs = () => (dispatch, getState) => {
  axios
    .get('/aed', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_AEDs,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET AEDs by building id
export const getAEDsByBuilding = (building_id) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.params = {};
  config.params.building = building_id;
  axios
    .get('/aed', config)
    .then((res) => {
      dispatch({
        type: GET_AEDs,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE AED
export const deleteAED = (id) => (dispatch, getState) => {
  axios
    .delete(`/aed/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteAED: 'AED Deleted' }));
      dispatch({
        type: DELETE_AEDs,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD AED
export const createAED = (AED) => (dispatch, getState) => {
  // If no upcoming dates are given, they autopopulate dates
  let d;
  if (!AED.upcoming_monthly_inspection) {
    d = new Date();
    AED.upcoming_monthly_inspection = new Date(d.setMonth(d.getMonth()+1));
  }
  axios
    .post('/aed/', AED, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addAED: 'AED Added' }));
      dispatch({
        type: ADD_AEDs,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// UPDATE AED dates
export const updateAEDInspectionDate = (AED, i) => (dispatch, getState) => {
  let requestBody = {};
  let d = new Date(i.date_tested);
  if (i.inspection_type === "monthly") {
    requestBody.last_monthly_inspection = i.date_tested;
    requestBody.upcoming_monthly_inspection = new Date(d.setMonth(d.getMonth()+1));
  }
  axios
    .patch(`/aed/${AED.id}/`, requestBody, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ updateAED: 'AED Updated' }));
      dispatch({
        type: UPDATE_AED,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// UPDATE AED dates
export const updateAEDLocation = (AED, requestBody, b) => (dispatch, getState) => {
  axios
    .patch(`/aed/${AED.id}/`, requestBody, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ AEDLocation: `AED relocated to ${b[0].name}` }));
      dispatch({
        type: UPDATE_AED,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET AED Inspections
export const getAEDInspecsById = (aed_id) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.params = {};
  config.params.aed = aed_id;
  axios
    .get(`/aed_inspection`, config)
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
    .post('/aed_inspection/', i, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addAEDInspection: 'Inspection Completed' }));
      dispatch({
        type: ADD_AED_INSP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

