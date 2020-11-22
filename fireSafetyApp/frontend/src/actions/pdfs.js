import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';


// GET Fire Extinguisher Inspection pdf
export const displayFEInspectionPDF = (params) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  console.log(config);
  axios
    .post(`/fe_report_pdf`, params, config)
    .then((res) => {
        const file = new Blob([res.data], {type: 'application/pdf'});
        const pdf = URL.createObjectURL(file);
        window.open(pdf);
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Alarm Inspection pdf
export const displayAlarmInspectionPDF = (id) => (dispatch, getState) => {
  axios
    .get(`/alarm_insp_pdf/${id}`, tokenConfig(getState))
    .then((res) => {
        const file = new Blob([res.data], {type: 'application/pdf'});
        const pdf = URL.createObjectURL(file);
        window.open(pdf);
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Sprinkler Inspection pdf
export const displaySprinklerInspectionPDF = (id) => (dispatch, getState) => {
  axios
    .get(`/sprinkler_insp_pdf/${id}`, tokenConfig(getState))
    .then((res) => {
        const file = new Blob([res.data], {type: 'application/pdf'});
        const pdf = URL.createObjectURL(file);
        window.open(pdf);
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET AED Inspection pdf
export const displayAEDInspectionPDF = (id) => (dispatch, getState) => {
  axios
    .get(`/aed_insp_pdf/${id}`, tokenConfig(getState))
    .then((res) => {
        const file = new Blob([res.data], {type: 'application/pdf'});
        const pdf = URL.createObjectURL(file);
        window.open(pdf);
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};