import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { displayASReportPDF } from '../../../actions/pdfs';
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";

export class ASReport extends Component {

  static propTypes = {
    displayASReportPDF: PropTypes.func.isRequired
  };

  convertToLocalTime = (d) => {
    const nd = new Date(d);
    return nd.toLocaleDateString().split("T")[0]
  }

  renderPDF = () => {
    const {building, as} = this.props.location.state;
    let pdfParams = {building, as};
    this.props.displayASReportPDF(pdfParams);
  }
  
  render() {
    const {building, as} = this.props.location.state;
    return (
      <Fragment>
          {/* ???Blane put captions on top of table */}
          <h2>Report for Alarm System</h2>
          <p>Located in: {building.name}</p>
          <button className={"btn btn--small"} onClick={() => this.renderPDF()}>View PDF</button>
          <p>*Button will cause report to appear in a new window when . If it does not appear be sure your ad-blocker is turned off.*</p>
          <p>Last Monthly Inspection: {this.convertToLocalTime(as.last_monthly_inspection)}</p>
          <p>Upcoming Monthly Inspection: {this.convertToLocalTime(as.upcoming_monthly_inspection)}</p>
          <p>Last Semi-Annual Inspection: {this.convertToLocalTime(as.last_semiannual_inspection)}</p>
          <p>Upcoming Semi-Annual Inspection: {this.convertToLocalTime(as.upcoming_semiannual_inspection)}</p>
          <p>Last Annual Inspection: {this.convertToLocalTime(as.last_annual_inspection)}</p>
          <p>Upcoming Annual Inspection: {this.convertToLocalTime(as.upcoming_annual_inspection)}</p>
          <Link to={{ pathname: "/AlarmSystem", state: {building: building, AlarmSystem: as}}}>
			<Button className={"btn btn--back"}>Back</Button>
		  </Link>
      </Fragment>
      );
    }
}
export default withRouter(connect(null, { displayASReportPDF })(ASReport));
