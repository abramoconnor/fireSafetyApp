import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';

// import { GET_FE_INSP } from './types';

// GET Fire Extinguisher Inspection pdf
export const displayFEInspectionPDF = (id) => (dispatch, getState) => {
  axios
    .get(`/fe_insp_pdf/${id}`, tokenConfig(getState))
    .then((res) => {
        const file = new Blob([res.data], {type: 'application/pdf'});
        const pdf = URL.createObjectURL(file);
        window.open(pdf);
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};