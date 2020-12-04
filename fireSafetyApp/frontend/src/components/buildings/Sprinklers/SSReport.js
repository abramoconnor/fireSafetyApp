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

  getPressures = (inspections) => {
    let weekly = inspections.filter(i => i.inspection_type === 'weekly');
    let monthly = inspections.filter(i => i.inspection_type === 'monthly');
    let quarterly = inspections.filter(i => i.inspection_type === 'quarterly');
    let semiAnnual = inspections.filter(i => i.inspection_type === 'semiannual');
    let annual = inspections.filter(i => i.inspection_type === 'annual');
    if (weekly.length > 0) {
      weekly.sort((a, b) => {
        if (a.date_tested < b.date_tested) {
          return 1;
        } else if (a.date_tested > b.date_tested) {
          return -1;
        } else {
          return 0;
        }
      });
    }
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
    if (quarterly.length > 0) {
      quarterly.sort((a, b) => {
        if (a.date_tested < b.date_tested) {
          return 1;
        } else if (a.date_tested > b.date_tested) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    if (semiAnnual.length > 0) {
      semiAnnual.sort((a, b) => {
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
      weeklyA: weekly[0] ? weekly[0].air_pressure : '',
      weeklyW: weekly[0] ? weekly[0].water_pressure : '',
      monthlyA: monthly[0] ? monthly[0].air_pressure : '',
      monthlyW: monthly[0] ? monthly[0].water_pressure : '',
      quarterlyA: quarterly[0] ? quarterly[0].air_pressure : '',
      quarterlyW: quarterly[0] ? quarterly[0].water_pressure : '',
      semiA: semiAnnual[0] ? semiAnnual[0].air_pressure : '',
      semiW: semiAnnual[0] ? semiAnnual[0].water_pressure : '',
      annualA: annual[0] ? annual[0].air_pressure : '',
      annualW: annual[0] ? annual[0].water_pressure : '',
    }
  }
  
  render() {
    const {building, ss, inspections} = this.props.location.state;
    const paragraphClass = ss.system_type === "Wet" ? 'hide' : '';
    let pressures = inspections.length > 0 ? this.getPressures(inspections) : {};
    
    return (
      <Fragment>
          <h2>Report for Sprinkler System: {ss.id}</h2>
          <p>Located in: {building.name}</p>
          <button className={"btn btn--small"} onClick={() => this.renderPDF()}>View PDF</button>
          <p>*Button will cause report to appear in a new window when . If it does not appear be sure your ad-blocker is turned off.*</p>
          <p className={paragraphClass}>Last Weekly Inspection: {this.convertToLocalTime(ss.last_weekly_inspection)}</p>
          <p className={paragraphClass}>Upcoming Weekly Inspection: {this.convertToLocalTime(ss.upcoming_weekly_inspection)}</p>
          <p>Last Monthly Inspection: {this.convertToLocalTime(ss.last_monthly_inspection)}</p>
          <p>Upcoming Monthly Inspection: {this.convertToLocalTime(ss.upcoming_monthly_inspection)}</p>
          <p>Last Quarterly Inspection: {this.convertToLocalTime(ss.last_quarterly_inspection)}</p>
          <p>Upcoming Quarterly Inspection: {this.convertToLocalTime(ss.upcoming_quarterly_inspection)}</p>
          <p>Last Semi-Annual Inspection: {this.convertToLocalTime(ss.last_semiannual_inspection)}</p>
          <p>Upcoming Semi-Annual Inspection: {this.convertToLocalTime(ss.upcoming_semiannual_inspection)}</p>
          <p>Last Annual Inspection: {this.convertToLocalTime(ss.last_annual_inspection)}</p>
          <p>Upcoming Annual Inspection: {this.convertToLocalTime(ss.upcoming_annual_inspection)}</p>
          <div>
            <h3>----------Pressures----------</h3>
            <p className={paragraphClass}>Last Weekly</p>
            <p className={paragraphClass}>   - Air: {pressures.weeklyA ? pressures.weeklyA : ''}</p>
            <p className={paragraphClass}>   - Water: {pressures.weeklyW ? pressures.weeklyW : ''}</p>
            <p>Last Monthly</p>
            <p className={paragraphClass}>   - Air: {pressures.monthlyA ? pressures.monthlyA : ''}</p>
            <p>   - Water: {pressures.monthlyW ? pressures.monthlyW : ''}</p>
            <p>Last Quarterly</p>
            <p className={paragraphClass}>   - Air: {pressures.quarterlyA ? pressures.quarterlyA : ''}</p>
            <p>   - Water: {pressures.quarterlyW ? pressures.quarterlyW : ''}</p>
            <p>Last Semi-Annual</p>
            <p className={paragraphClass}>   - Air: {pressures.semiA ? pressures.semiA : ''}</p>
            <p>   - Water: {pressures.semiW ? pressures.semiW : ''}</p>
            <p>Last Annual</p>
            <p className={paragraphClass}>   - Air: {pressures.annualA ? pressures.annualA : ''}</p>
            <p>   - Water: {pressures.annualW ? pressures.annualW : ''}</p>
          </div>
          <Link to={{ pathname: "/SprinklerSystem", state: {building: building, ss: ss}}}>
			      <Button className={"btn btn--back"}>Back</Button>
		      </Link>
      </Fragment>
      );
    }
}
export default withRouter(connect(null, { displaySSReportPDF })(SSReport));
