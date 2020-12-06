import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';


// GET Fire Extinguisher Report pdf
export const displayFEReportPDF = (params) => (dispatch, getState) => {
  const lm = new Date(params.fe.last_monthly_inspection);
  params.fe.last_monthly_inspection = lm.toLocaleDateString().split("T")[0]
  const um = new Date(params.fe.upcoming_monthly_inspection);
  params.fe.upcoming_monthly_inspection = um.toLocaleDateString().split("T")[0]
  const la = new Date(params.fe.last_annual_inspection);
  params.fe.last_annual_inspection = la.toLocaleDateString().split("T")[0]
  const ua = new Date(params.fe.upcoming_annual_inspection);
  params.fe.upcoming_annual_inspection = ua.toLocaleDateString().split("T")[0]
  const l6 = new Date(params.fe.last_6year_service);
  params.fe.last_6year_service = l6.toLocaleDateString().split("T")[0]
  const u6 = new Date(params.fe.upcoming_6year_service);
  params.fe.upcoming_6year_service = u6.toLocaleDateString().split("T")[0]
  const l12 = new Date(params.fe.last_12year_test);
  params.fe.last_12year_test = l12.toLocaleDateString().split("T")[0]
  const u12 = new Date(params.fe.upcoming_12year_test);
  params.fe.upcoming_12year_test = u12.toLocaleDateString().split("T")[0]
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

// GET Pump Report pdf
export const displayPumpReportPDF = (params) => (dispatch, getState) => {
  let config = tokenConfig(getState);
  axios
    .get(`/pump_report_pdf`, params, config)
    .then((res) => {
        const file = new Blob([res.data], {type: 'application/pdf'});
        const pdf = URL.createObjectURL(file);
        window.open(pdf);
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};