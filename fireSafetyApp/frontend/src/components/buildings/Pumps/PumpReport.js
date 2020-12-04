import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { displayPumpReportPDF } from '../../../actions/pdfs';
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";

export class PumpReport extends Component {

  static propTypes = {
    displayPumpReportPDF: PropTypes.func.isRequired
  };

  convertToLocalTime = (d) => {
    const nd = new Date(d);
    return nd.toLocaleDateString().split("T")[0]
  }

  renderPDF = () => {
    const {building, pump} = this.props.location.state;
    let pdfParams = {building, pump};
    this.props.displayPumpReportPDF(pdfParams);
  }
  
  render() {
    const {building, pump} = this.props.location.state;
    return (
      <Fragment>
          <h2>Report for Fire Pump</h2>
          <p>Located in: {building.name}</p>
          <button className={"btn btn--small"} onClick={() => this.renderPDF()}>View PDF</button>
          <p>*Button will cause report to appear in a new window when . If it does not appear be sure your ad-blocker is turned off.*</p>
          <p>Last Monthly Inspection: {this.convertToLocalTime(pump.last_monthly_inspection)}</p>
          <p>Upcoming Monthly Inspection: {this.convertToLocalTime(pump.upcoming_monthly_inspection)}</p>
          <p>Last Annual Inspection: {this.convertToLocalTime(pump.last_annual_inspection)}</p>
          <p>Upcoming Annual Inspection: {this.convertToLocalTime(pump.upcoming_annual_inspection)}</p>
          <Link to={{ pathname: "/FirePump", state: {building: building, pump: pump}}}>
			      <Button className={"btn btn--back"}>Back</Button>
		      </Link>
      </Fragment>
      );
    }
}
export default withRouter(connect(null, { displayPumpReportPDF })(PumpReport));
