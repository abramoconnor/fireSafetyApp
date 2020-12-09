import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { displayPumpReportPDF } from '../../../actions/pdfs';
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";

export class PumpReport extends Component {
  state = {
    includeNotes: false
  }

  static propTypes = {
    displayPumpReportPDF: PropTypes.func.isRequired
  };

  setIncludeNotes = (value) => {
    this.setState({includeNotes: !value});
  }

  convertToLocalTime = (d) => {
    const nd = new Date(d);
    return nd.toLocaleDateString().split("T")[0]
  }

  renderPDF = (attributes) => {
    const {building, pump, notes} = this.props.location.state;
    const {includeNotes} = this.state;
    let pdfParams = {building, pump, attributes};
    if (includeNotes) {
      pdfParams.notes = notes;
    } else pdfParams.notes = '';
    this.props.displayPumpReportPDF(pdfParams);
    this.setState({includeNotes: false});
  }

  getAttributes = (inspections) => {
    let monthly = inspections.filter(i => i.inspection_type === 'monthly');
    let annual = inspections.filter(i => i.inspection_type === 'annual');
    if (monthly.length > 0) {
      monthly.sort((a, b) => {
        if (a.date_tested < b.date_tested) {
          return 1;
        } else if (a.date_tested > b.date_tested) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    if (annual.length > 0) {
      annual.sort((a, b) => {
        if (a.date_tested < b.date_tested) {
          return 1;
        } else if (a.date_tested > b.date_tested) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    return {
      monthlyS: monthly[0] ? monthly[0].suction_pressure : 'N/A',
      monthlyD: monthly[0] ? monthly[0].discharge_pressure : 'N/A',
      monthlyR: monthly[0] ? monthly[0].run_time : 'N/A',
      annualS: annual[0] ? annual[0].suction_pressure : 'N/A',
      annualD: annual[0] ? annual[0].discharge_pressure : 'N/A',
      annualR: annual[0] ? annual[0].run_time : 'N/A',
    }
  }
  
  render() {
    const {building, pump, notes, inspections} = this.props.location.state;
    const {includeNotes} = this.state;
    const buttonClass = includeNotes ? 'green' : 'red';
    const buttonYorN = includeNotes ? 'Yes' : 'No';
    let attributes = inspections.length > 0 ? this.getAttributes(inspections) : {};
    return (
      <Fragment>
          <h2>Report for Fire Pump</h2>
          <p>Located in: {building.name}</p>
          <button className={"btn btn--small"} onClick={() => this.renderPDF(attributes)}>View PDF</button>
          <button className={buttonClass} onClick={() => this.setIncludeNotes(includeNotes)}>Include Notes?: {buttonYorN}</button>
          <p>*Button will cause report to appear in a new window when . If it does not appear be sure your ad-blocker is turned off.*</p>
          <h3>----------Inspections----------</h3>
          <p>Last Monthly Inspection: {this.convertToLocalTime(pump.last_monthly_inspection)}</p>
          <p>Upcoming Monthly Inspection: {this.convertToLocalTime(pump.upcoming_monthly_inspection)}</p>
          <p>Last Annual Inspection: {this.convertToLocalTime(pump.last_annual_inspection)}</p>
          <p>Upcoming Annual Inspection: {this.convertToLocalTime(pump.upcoming_annual_inspection)}</p>
          <div>
            <h3>----------Pressures & Run Times----------</h3>
            <p>Last Monthly</p>
            <p>   - Suction (PSI): {attributes.monthlyS}</p>
            <p>   - Discharge (PSI): {attributes.monthlyD}</p>
            <p>   - Run Time (min): {attributes.monthlyR}</p>
            <p>Last Annual</p>
            <p>   - Suction (PSI): {attributes.annualS}</p>
            <p>   - Discharge (PSI): {attributes.annualD}</p>
            <p>   - Run Time (min): {attributes.annualR}</p>
          </div>
          <div>
            <h3>----------Notes----------</h3>
            {notes.map(n => <p key={n.id}>{n.note}</p>)}
          </div>
          <Link to={{ pathname: "/FirePump", state: {building: building, pump: pump}}}>
			      <Button className={"btn btn--back"}>Back</Button>
		      </Link>
      </Fragment>
      );
    }
}
export default withRouter(connect(null, { displayPumpReportPDF })(PumpReport));
