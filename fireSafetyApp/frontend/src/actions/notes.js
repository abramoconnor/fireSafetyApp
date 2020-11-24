import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_FE_NOTES, ADD_FE_NOTES } from './types';

// CREATE FE Notes
export const createFENote = (n) => (dispatch, getState) => {
    axios
      .post('/fe_notes/', n, tokenConfig(getState))
      .then((res) => {
        dispatch(createMessage({ addFENote: 'Note Added' }));
        dispatch({
          type: ADD_FE_NOTES,
          payload: res.data,
        });
      })
      .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
  };

  // GET FE Notes
export const getFENotesById = (fe_id) => (dispatch, getState) => {
    let config = tokenConfig(getState);
    config.params = {};
    config.params.fire_extinguisher = fe_id;
    axios
      .get(`/fe_notes`, config)
      .then((res) => {
        dispatch({
          type: GET_FE_NOTES,
          payload: res.data,
        });
      })
      .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
  };