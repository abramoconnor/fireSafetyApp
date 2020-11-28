import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { displayFEReportPDF } from '../../../actions/pdfs';
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";

export class FEReport extends Component {

  static propTypes = {
    displayFEReportPDF: PropTypes.func.isRequired
  };

  convertToLocalTime = (d) => {
    const nd = new Date(d);
    return nd.toLocaleDateString().split("T")[0]
  }

  renderPDF = () => {
    const {building, fe} = this.props.location.state;
    let pdfParams = {building, fe};
    this.props.displayFEReportPDF(pdfParams);
  }
  
  render() {
    const {building, fe} = this.props.location.state;
    return (
      <Fragment>
          {/* ???Blane put captions on top of table */}
          <h2>Report for Fire Extinguisher: {fe.exnum}</h2>
          <p>Located in: {building.name}</p>
          <p>*Report will appear in a new window. If it does not appear be sure your ad-blocker is turned off.*</p>
          <button className={"btn btn--small"} onClick={() => this.renderPDF()}>View PDF</button>
          <p>Last Monthly Inspection: {this.convertToLocalTime(fe.last_monthly_inspection)}</p>
          <p>Upcoming Monthly Inspection: {this.convertToLocalTime(fe.upcoming_monthly_inspection)}</p>
          <p>Last Annual Inspection: {this.convertToLocalTime(fe.last_annual_inspection)}</p>
          <p>Upcoming Annual Inspection: {this.convertToLocalTime(fe.upcoming_annual_inspection)}</p>
          <p>Last 6 Year Service: {this.convertToLocalTime(fe.last_6year_service)}</p>
          <p>Upcoming 6 Year Service: {this.convertToLocalTime(fe.upcoming_6year_service)}</p>
          <p>Last 12 Year Test: {this.convertToLocalTime(fe.last_12year_test)}</p>
          <p>Upcoming 12 Year Test: {this.convertToLocalTime(fe.upcoming_12year_test)}</p>
          <Link to={{ pathname: "/FireExtinguisher", state: {building: building, fe: fe}}}>
			<Button className={"btn btn--back"}>Back</Button>
		  </Link>
      </Fragment>
      );
    }
}
export default withRouter(connect(null, { displayFEReportPDF })(FEReport));
