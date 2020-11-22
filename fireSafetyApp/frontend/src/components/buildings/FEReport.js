import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { displayFEInspectionPDF } from '../../actions/pdfs';
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";

export class FEReport extends Component {

  static propTypes = {
    displayFEInspectionPDF: PropTypes.func.isRequired
  };

  componentDidMount() {
  }

  renderPDF = () => {
    const {building, fe} = this.props.location.state;
    let pdfParams = {building, fe};
    console.log(pdfParams);
    this.props.displayFEInspectionPDF(pdfParams);
  }
  
  render() {
    const {building, fe} = this.props.location.state;
    return (
      <Fragment>
          {/* ???Blane put captions on top of table */}
          <h2>Report for Fire Extinguisher: {fe.exnum}</h2>
          <p>Located in: {building.name}</p>
          <button className={"btn btn--small"} onClick={() => this.renderPDF()}>View PDF</button>
          <p>Last Monthly Inspection: {fe.last_monthly_inspection.split("T")[0]}</p>
          <p>Upcoming Monthly Inspection: {fe.upcoming_monthly_inspection.split("T")[0]}</p>
          <p>Last Annual Inspection: {fe.last_annual_inspection.split("T")[0]}</p>
          <p>Upcoming Annual Inspection: {fe.upcoming_annual_inspection.split("T")[0]}</p>
          <p>Last 6 Year Service: {fe.last_6year_service.split("T")[0]}</p>
          <p>Upcoming 6 Year Service: {fe.upcoming_6year_service.split("T")[0]}</p>
          <p>Last 12 Year Test: {fe.last_12year_test.split("T")[0]}</p>
          <p>Upcoming 12 Year Test: {fe.upcoming_12year_test.split("T")[0]}</p>
          <Link to={{ pathname: "/FireExtinguisher", state: {building: building, fe: fe}}}>
			<Button className={"btn btn--back"}>Back</Button>
		  </Link>
      </Fragment>
      );
    }
}
export default withRouter(connect(null, { displayFEInspectionPDF })(FEReport));
