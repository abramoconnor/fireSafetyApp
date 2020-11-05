import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_FEs, DELETE_FEs, ADD_FEs } from './types';

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

// DELETE Fire Extinguishers
export const deleteFEs = (id) => (dispatch, getState) => {
  axios
    .delete(`/fire_extinguish/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteFEs: 'FE Deleted' }));
      dispatch({
        type: DELETE_FEs,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD Fire Extinguishers
export const addFEs = (FE) => (dispatch, getState) => {
  axios
    .post('/fire_extinguish', FE, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addFE: 'FE Added' }));
      dispatch({
        type: ADD_FEs,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
