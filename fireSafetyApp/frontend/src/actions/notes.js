import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_FE_NOTES, ADD_FE_NOTES, DELETE_FE_NOTES, GET_AS_NOTES, ADD_AS_NOTES, DELETE_AS_NOTES, GET_SP_NOTES, ADD_SP_NOTES, DELETE_SP_NOTES, GET_AED_NOTES, ADD_AED_NOTES, DELETE_AED_NOTES, GET_PUMP_NOTES, ADD_PUMP_NOTES, DELETE_PUMP_NOTES } from './types';

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

  // DELETE FE Notes
export const deleteFENote = (id) => (dispatch, getState) => {
  axios
    .delete(`/fe_notes/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteFENotes: 'Note Deleted' }));
      dispatch({
        type: DELETE_FE_NOTES,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// CREATE Alarm System Notes
export const createASNote = (n) => (dispatch, getState) => {
  axios
    .post('/alarmsys_notes/', n, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addASNote: 'Note Added' }));
      dispatch({
        type: ADD_AS_NOTES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Alarm System Notes
export const getASNotesById = (as_id) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.params = {};
  config.params.fire_extinguisher = as_id;
  axios
    .get(`/alarmsys_notes`, config)
    .then((res) => {
      dispatch({
        type: GET_AS_NOTES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE Alarm System Notes
export const deleteASNote = (id) => (dispatch, getState) => {
axios
  .delete(`/alarmsys_notes/${id}/`, tokenConfig(getState))
  .then((res) => {
    dispatch(createMessage({ deleteASNotes: 'Note Deleted' }));
    dispatch({
      type: DELETE_AS_NOTES,
      payload: id,
    });
  })
  .catch((err) => console.log(err));
};

// CREATE Sprinkler System Notes
export const createSSNote = (n) => (dispatch, getState) => {
  axios
    .post('/sprinklersys_notes/', n, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addSSNote: 'Note Added' }));
      dispatch({
        type: ADD_SP_NOTES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Sprinkler System Notes
export const getSSNotesById = (ss_id) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.params = {};
  config.params.sprinkler_system = ss_id;
  axios
    .get(`/sprinklersys_notes`, config)
    .then((res) => {
      dispatch({
        type: GET_SP_NOTES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE Sprinkler System Notes
export const deleteSSNote = (id) => (dispatch, getState) => {
axios
  .delete(`/sprinklersys_notes/${id}/`, tokenConfig(getState))
  .then((res) => {
    dispatch(createMessage({ deleteSSNotes: 'Note Deleted' }));
    dispatch({
      type: DELETE_SP_NOTES,
      payload: id,
    });
  })
  .catch((err) => console.log(err));
};

export const createAEDNote = (n) => (dispatch, getState) => {
  axios
    .post('/aed_notes/', n, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addAEDNote: 'Note Added' }));
      dispatch({
        type: ADD_AED_NOTES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET AED Notes
export const getAEDNotesById = (aed_id) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.params = {};
  config.params.aed = aed_id;
  axios
    .get(`/aed_notes`, config)
    .then((res) => {
      dispatch({
        type: GET_AED_NOTES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE AED Notes
export const deleteAEDNote = (id) => (dispatch, getState) => {
axios
  .delete(`/aed_notes/${id}/`, tokenConfig(getState))
  .then((res) => {
    dispatch(createMessage({ deleteAEDNotes: 'Note Deleted' }));
    dispatch({
      type: DELETE_AED_NOTES,
      payload: id,
    });
  })
  .catch((err) => console.log(err));
};

// CREATE Pump Notes
export const createPumpNote = (n) => (dispatch, getState) => {
  axios
    .post('/pump_notes/', n, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addPumpNote: 'Note Added' }));
      dispatch({
        type: ADD_PUMP_NOTES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Pump Notes
export const getPumpNotesById = (p_id) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  config.params = {};
  config.params.fire_pump = p_id;
  axios
    .get(`/pump_notes`, config)
    .then((res) => {
      dispatch({
        type: GET_PUMP_NOTES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE Alarm System Notes
export const deletePumpNote = (id) => (dispatch, getState) => {
axios
  .delete(`/pump_notes/${id}/`, tokenConfig(getState))
  .then((res) => {
    dispatch(createMessage({ deletePumpNotes: 'Note Deleted' }));
    dispatch({
      type: DELETE_PUMP_NOTES,
      payload: id,
    });
  })
  .catch((err) => console.log(err));
};