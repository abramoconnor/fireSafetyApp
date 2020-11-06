import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_SPRINKLERs, DELETE_SPRINKLERs, ADD_SPRINKLERs } from './types';

// GET SPRINKLERs
export const getSPRINKLERs = () => (dispatch, getState) => {
  axios
    .get('/SPRINKLERs', tokenConfig(getState))
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
    .delete(`/SPRINKLERs/${id}/`, tokenConfig(getState))
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
export const addSPRINKLERs = (SPRINKLER) => (dispatch, getState) => {
  axios
    .post('/SPRINKLERs', SPRINKLER, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addSPRINKLER: 'SPRINKLER Added' }));
      dispatch({
        type: ADD_SPRINKLERs,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
