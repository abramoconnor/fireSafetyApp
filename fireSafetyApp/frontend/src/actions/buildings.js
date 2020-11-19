import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_BUILDINGS, DELETE_BUILDING, ADD_BUILDING } from './types';

// GET BUILDINGS
export const getBuildings = () => (dispatch, getState) => {
  axios
    .get('/buildings', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_BUILDINGS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE BUILDING
export const deleteBuilding = (id) => (dispatch, getState) => {
  axios
    .delete(`/buildings/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteBuilding: 'Building Deleted' }));
      dispatch({
        type: DELETE_BUILDING,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD BUILDING
export const createBuilding = (building) => (dispatch, getState) => {
  axios
    .post('/buildings/', building, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addBuilding: `${building.name} created` }));
      dispatch({
        type: ADD_BUILDING,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
