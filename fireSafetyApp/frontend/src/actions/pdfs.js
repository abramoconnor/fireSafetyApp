import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';


// GET Fire Extinguisher Report pdf
export const displayFEReportPDF = (params) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  axios
    .post(`/fe_report_pdf`, params, config)
    .then((res) => {
        const file = new Blob([res.data], {type: 'application/pdf'});
        const pdf = URL.createObjectURL(file);
        window.open(pdf);
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Alarm Report pdf
export const displayASReportPDF = (params) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  axios
    .get(`/alarmsys_report_pdf`, params, config)
    .then((res) => {
        const file = new Blob([res.data], {type: 'application/pdf'});
        const pdf = URL.createObjectURL(file);
        window.open(pdf);
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Sprinkler Inspection pdf
export const displaySSReportPDF = (params) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  axios
    .get(`/sprinkler_insp_pdf`, config)
    .then((res) => {
        const file = new Blob([res.data], {type: 'application/pdf'});
        const pdf = URL.createObjectURL(file);
        window.open(pdf);
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET AED Inspection pdf
export const displayAEDReportPDF = (params) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  axios
    .get(`/aed_report_pdf`, tokenConfig(getState))
    .then((res) => {
        const file = new Blob([res.data], {type: 'application/pdf'});
        const pdf = URL.createObjectURL(file);
        window.open(pdf);
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};