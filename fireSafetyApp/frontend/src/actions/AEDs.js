import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_AEDs, DELETE_AEDs, ADD_AEDs } from './types';

// GET AEDs
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

// DELETE AEDs
export const deleteAEDs = (id) => (dispatch, getState) => {
  axios
    .delete(`/AEDs/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteAEDs: 'AED Deleted' }));
      dispatch({
        type: DELETE_AEDs,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD AEDs
export const addAEDs = (AED) => (dispatch, getState) => {
  axios
    .post('/AEDs', AED, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addAED: 'AED Added' }));
      dispatch({
        type: ADD_AEDs,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
