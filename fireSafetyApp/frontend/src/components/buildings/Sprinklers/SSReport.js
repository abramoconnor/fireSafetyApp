import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { displaySSReportPDF } from '../../../actions/pdfs';
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";

export class SSReport extends Component {

  static propTypes = {
    displaySSReportPDF: PropTypes.func.isRequired
  };

  convertToLocalTime = (d) => {
    const nd = new Date(d);
    return nd.toLocaleDateString().split("T")[0]
  }

  renderPDF = () => {
    const {building, ss} = this.props.location.state;
    let pdfParams = {building, ss};
    this.props.displayFEReportPDF(pdfParams);
  }
  
  render() {
    const {building, ss} = this.props.location.state;
    return (
      <Fragment>
          <h2>Report for Sprinkler System: {ss.id}</h2>
          <p>Located in: {building.name}</p>
          <button className={"btn btn--small"} onClick={() => this.renderPDF()}>View PDF</button>
          <p>*Button will cause report to appear in a new window when . If it does not appear be sure your ad-blocker is turned off.*</p>
          <p>Last Weekly Inspection: {this.convertToLocalTime(ss.last_weekly_inspection)}</p>
          <p>Upcoming Weekly Inspection: {this.convertToLocalTime(ss.upcoming_weekly_inspection)}</p>
          <p>Last Monthly Inspection: {this.convertToLocalTime(ss.last_monthly_inspection)}</p>
          <p>Upcoming Monthly Inspection: {this.convertToLocalTime(ss.upcoming_monthly_inspection)}</p>
          <p>Last Quarterly Inspection: {this.convertToLocalTime(ss.last_quarterly_inspection)}</p>
          <p>Upcoming Quarterly Inspection: {this.convertToLocalTime(ss.upcoming_quarterly_inspection)}</p>
          <p>Last Semi-Annual Inspection: {this.convertToLocalTime(ss.last_semiannual_inspection)}</p>
          <p>Upcoming Semi-Annual Inspection: {this.convertToLocalTime(ss.upcoming_semiannual_inspection)}</p>
          <p>Last Annual Inspection: {this.convertToLocalTime(ss.last_annual_inspection)}</p>
          <p>Upcoming Annual Inspection: {this.convertToLocalTime(ss.upcoming_annual_inspection)}</p>
          <Link to={{ pathname: "/SprinklerSystem", state: {building: building, ss: ss}}}>
			<Button className={"btn btn--back"}>Back</Button>
		  </Link>
      </Fragment>
      );
    }
}
export default withRouter(connect(null, { displaySSReportPDF })(SSReport));
