import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { displayAEDReportPDF } from '../../../actions/pdfs';
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";

export class AEDReport extends Component {
  state = {
    includeNotes: false
  }

  static propTypes = {
    displayAEDReportPDF: PropTypes.func.isRequired
  };

  setIncludeNotes = (value) => {
    this.setState({includeNotes: !value});
  }

  convertToLocalTime = (d) => {
    const nd = new Date(d);
    return nd.toLocaleDateString().split("T")[0]
  }

  renderPDF = () => {
    const {building, aed, notes} = this.props.location.state;
    const {includeNotes} = this.state;
    let pdfParams = {building, aed};
    if (includeNotes) {
      pdfParams.notes = notes;
    } else pdfParams.notes = '';
    this.props.displayAEDReportPDF(pdfParams);
    this.setState({includeNotes: false});
  }

  render() {
    const {building, aed, notes} = this.props.location.state;
    const {includeNotes} = this.state;
    const buttonClass = includeNotes ? 'btn--yes' : 'btn--no';
    const buttonYorN = includeNotes ? 'Yes' : 'No';
    return (
      <Fragment>
          <h2>Report for AED</h2>
          <p>Located in: {building.name} at {aed.location}</p>
          <button className={"btn btn--small"} onClick={() => this.renderPDF()}>View PDF</button>
          <button className={buttonClass} onClick={() => this.setIncludeNotes(includeNotes)}>Include Notes?: {buttonYorN}</button>
          <p>*Button will cause report to appear in a new window when . If it does not appear be sure your ad-blocker is turned off.*</p>
          <h3>----------Inspections----------</h3>
          <p>Last Monthly Inspection: {this.convertToLocalTime(aed.last_monthly_inspection)}</p>
          <p>Upcoming Monthly Inspection: {this.convertToLocalTime(aed.upcoming_monthly_inspection)}</p>
          <h3>----------Notes----------</h3>
          {notes.map(n => <p key={n.id}>{n.note}</p>)}
          <Link to={{ pathname: "/AED", state: {building: building, aed: aed}}}>
			<Button className={"btn btn--back"}>Back</Button>
		  </Link>
      </Fragment>
      );
    }
}
export default withRouter(connect(null, { displayAEDReportPDF })(AEDReport));
