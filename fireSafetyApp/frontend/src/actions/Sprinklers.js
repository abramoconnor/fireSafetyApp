import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_SPRINKLERs, DELETE_SPRINKLERs, ADD_SPRINKLERs, GET_SPRINKLER_INSP } from './types';

// GET SPRINKLERs
export const getSPRINKLERs = () => (dispatch, getState) => {
  axios
    .get('/sprinklers', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_SPRINKLERs,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE SPRINKLERs
export const deleteSPRINKLERs = (id) => (dispatch, getState) => {
  axios
    .delete(`/sprinklers/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteSPRINKLERs: 'SPRINKLER Deleted' }));
      dispatch({
        type: DELETE_SPRINKLERs,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD SPRINKLERs
export const addSPRINKLERs = (sprinkler) => (dispatch, getState) => {
  axios
    .post('/sprinklers', sprinkler, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addSPRINKLER: 'SPRINKLER Added' }));
      dispatch({
        type: ADD_SPRINKLERs,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Sprinkler Inspections
export const getSprinklerInspecs = () => (dispatch, getState) => {
  axios
    .get('/sprinkler_inspection', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_SPRINKLER_INSP,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};