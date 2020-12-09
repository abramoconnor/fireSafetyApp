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
  const lm = new Date(params.as.last_monthly_inspection);
  params.as.last_monthly_inspection = lm.toLocaleDateString().split("T")[0]
  const um = new Date(params.as.upcoming_monthly_inspection);
  params.as.upcoming_monthly_inspection = um.toLocaleDateString().split("T")[0]
  const ls = new Date(params.as.last_semiannual_inspection);
  params.as.last_semiannual_inspection = ls.toLocaleDateString().split("T")[0]
  const us = new Date(params.as.upcoming_semiannual_inspection);
  params.as.upcoming_semiannual_inspection = us.toLocaleDateString().split("T")[0]
  const la = new Date(params.as.last_annual_inspection);
  params.as.last_annual_inspection = la.toLocaleDateString().split("T")[0]
  const ua = new Date(params.as.upcoming_annual_inspection);
  params.as.upcoming_annual_inspection = ua.toLocaleDateString().split("T")[0]
  let config = tokenConfig(getState);
  axios
    .post(`/alarmsys_report_pdf`, params, config)
    .then((res) => {
        const file = new Blob([res.data], {type: 'application/pdf'});
        const pdf = URL.createObjectURL(file);
        window.open(pdf);
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Sprinkler Inspection pdf
export const displaySSReportPDF = (params) => (dispatch, getState) => {
  const lw = new Date(params.ss.last_weekly_inspection);
  params.ss.last_weekly_inspection = lw.toLocaleDateString().split("T")[0]
  const uw = new Date(params.ss.upcoming_weekly_inspection);
  params.ss.upcoming_weekly_inspection = uw.toLocaleDateString().split("T")[0]
  const lm = new Date(params.ss.last_monthly_inspection);
  params.ss.last_monthly_inspection = lm.toLocaleDateString().split("T")[0]
  const um = new Date(params.ss.upcoming_monthly_inspection);
  params.ss.upcoming_monthly_inspection = um.toLocaleDateString().split("T")[0]
  const lq = new Date(params.ss.last_quarterly_inspection);
  params.ss.last_quarterly_inspection = lq.toLocaleDateString().split("T")[0]
  const uq = new Date(params.ss.upcoming_quarterly_inspection);
  params.ss.upcoming_quarterly_inspection = uq.toLocaleDateString().split("T")[0]
  const ls = new Date(params.ss.last_semiannual_inspection);
  params.ss.last_semiannual_inspection = ls.toLocaleDateString().split("T")[0]
  const us = new Date(params.ss.upcoming_semiannual_inspection);
  params.ss.upcoming_semiannual_inspection = us.toLocaleDateString().split("T")[0]
  const la = new Date(params.ss.last_annual_inspection);
  params.ss.last_annual_inspection = la.toLocaleDateString().split("T")[0]
  const ua = new Date(params.ss.upcoming_annual_inspection);
  params.ss.upcoming_annual_inspection = ua.toLocaleDateString().split("T")[0]
  let config = tokenConfig(getState);
  axios
    .post(`/sprinkler_report_pdf`, params, config)
    .then((res) => {
        const file = new Blob([res.data], {type: 'application/pdf'});
        const pdf = URL.createObjectURL(file);
        window.open(pdf);
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET AED Inspection pdf
export const displayAEDReportPDF = (params) => (dispatch, getState) => {
  const lm = new Date(params.aed.last_monthly_inspection);
  params.aed.last_monthly_inspection = lm.toLocaleDateString().split("T")[0]
  const um = new Date(params.aed.upcoming_monthly_inspection);
  params.aed.upcoming_monthly_inspection = um.toLocaleDateString().split("T")[0]
  let config = tokenConfig(getState);
  axios
    .post(`/aed_report_pdf`, params, config)
    .then((res) => {
        const file = new Blob([res.data], {type: 'application/pdf'});
        const pdf = URL.createObjectURL(file);
        window.open(pdf);
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET Pump Report pdf
export const displayPumpReportPDF = (params) => (dispatch, getState) => {
  const lm = new Date(params.pump.last_monthly_inspection);
  params.pump.last_monthly_inspection = lm.toLocaleDateString().split("T")[0]
  const um = new Date(params.pump.upcoming_monthly_inspection);
  params.pump.upcoming_monthly_inspection = um.toLocaleDateString().split("T")[0]
  const la = new Date(params.pump.last_annual_inspection);
  params.pump.last_annual_inspection = la.toLocaleDateString().split("T")[0]
  const ua = new Date(params.pump.upcoming_annual_inspection);
  params.pump.upcoming_annual_inspection = ua.toLocaleDateString().split("T")[0]
  let config = tokenConfig(getState);
  axios
    .post(`/pump_report_pdf`, params, config)
    .then((res) => {
        const file = new Blob([res.data], {type: 'application/pdf'});
        const pdf = URL.createObjectURL(file);
        window.open(pdf);
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};