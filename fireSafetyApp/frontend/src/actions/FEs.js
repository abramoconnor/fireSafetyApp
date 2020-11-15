import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_FEs, DELETE_FEs, ADD_FEs, GET_FE_INSP } from './types';

// GET Fire Extinguishers
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

// DELETE Fire Extinguisher
export const deleteFE = (id) => (dispatch, getState) => {
  axios
    .delete(`/fire_extinguish/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteFE: 'Fire Extinguishers Deleted' }));
      dispatch({
        type: DELETE_FEs,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD Fire Extinguisher
export const createFE = (FE) => (dispatch, getState) => {
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

// GET FE Inspections
export const getFEInspecs = () => (dispatch, getState) => {
  axios
    .get('/fe_inspection', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_FE_INSP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};