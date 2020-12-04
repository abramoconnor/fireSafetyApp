import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteSprinklerSystem, getSprinklerSysInspecs } from '../../../actions/Sprinklers';
import {getSSNotesById, deleteSSNote} from "../../../actions/notes"
import { Link, withRouter, Redirect } from 'react-router-dom';
import {Button} from "react-bootstrap";
import SSNotes from "./SSNotes";

export class SprinklerSystem extends Component {
  state = {
    isDeleted: false,
    isWet: false
  };

  static propTypes = {
    getSSNotesById: PropTypes.func.isRequired,
    getSprinklerSysInspecs: PropTypes.func.isRequired,
    deleteSSNote: PropTypes.func.isRequired,
    deleteSprinklerSystem: PropTypes.func.isRequired,
    SSInspecs: PropTypes.array.isRequired,
    SSNotes: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.getSprinklerSysInspecs(this.props.location.state.ss.id);
    this.props.getSSNotesById(this.props.location.state.ss.id);
  }

  deleteSprinklerSystem = (id) => {
    this.props.deleteSprinklerSystem(id);
    this.setState({isDeleted: true})
  }
  
  deleteNote = (id) => {
    this.props.deleteSSNote(id);
  }

  parseWeeklyInspections = (i) => {
    const nd = new Date(i.date_tested);
    if (i.inspection_type === "weekly") {
        return (
            <tr key={i.id}>
                <td>{nd.toLocaleDateString().split("T")[0]}</td>
                <td>{i.air_pressure}</td>
                <td>{i.water_pressure}</td>
                <td>{i.tester}</td>
            </tr>
        )
    }
  }

  parseMonthlyInspections = (i) => {
    const {ss} = this.props.location.state;
    const rowClass = ss.system_type === "Wet" ? 'hide' : '';
    const nd = new Date(i.date_tested);
    if (i.inspection_type === "monthly") {
        return (
            <tr key={i.id}>
                <td>{nd.toLocaleDateString().split("T")[0]}</td>
                <td className={rowClass}>{i.air_pressure}</td>
                <td>{i.water_pressure}</td>
                <td>{i.tester}</td>
            </tr>
        )
    }
  }

  parseQuarterlyInspections = (i) => {
    const {ss} = this.props.location.state;
    const rowClass = ss.system_type === "Wet" ? 'hide' : '';
    const nd = new Date(i.date_tested);
    if (i.inspection_type === "quarterly") {
        return (
            <tr key={i.id}>
                <td>{nd.toLocaleDateString().split("T")[0]}</td>
                <td className={rowClass}>{i.air_pressure}</td>
                <td>{i.water_pressure}</td>
                <td>{i.tester}</td>
            </tr>
        )
    }
  }

  parseSemiAnnualInspections = (i) => {
    const {ss} = this.props.location.state;
    const rowClass = ss.system_type === "Wet" ? 'hide' : '';
    const nd = new Date(i.date_tested);
    if (i.inspection_type === "semiannual") {
        return (
            <tr key={i.id}>
                <td>{nd.toLocaleDateString().split("T")[0]}</td>
                <td className={rowClass}>{i.air_pressure}</td>
                <td>{i.water_pressure}</td>
                <td>{i.tester}</td>
            </tr>
        )
    }
  }

  parseAnnualInspections = (i) => {
    const {ss} = this.props.location.state;
    const rowClass = ss.system_type === "Wet" ? 'hide' : '';
    const nd = new Date(i.date_tested);
    if (i.inspection_type === "annual") {
        return (
            <tr key={i.id}>
                <td>{nd.toLocaleDateString().split("T")[0]}</td>
                <td className={rowClass}>{i.air_pressure}</td>
                <td>{i.water_pressure}</td>
                <td>{i.tester}</td>
            </tr>
        )
    }
  }

  nextInspection = (ss) => {
    let next;
    let type;
    if (ss.system_type === 'Wet') {
      next = ss.upcoming_monthly_inspection;
      type = "(Monthly Inspection)";
      if (ss.upcoming_quarterly_inspection < next ) {
        next = ss.upcoming_quarterly_inspection;
        type = "(Quarterly Inspection)";
      } else if (ss.upcoming_semiannual_inspection < next) {
        next = ss.upcoming_semiannual_inspection;
        type = "(Semi-Annual Inspection)";
      } else if (ss.upcoming_annual_inspection < next) {
        next = ss.upcoming_annual_inspection;
        type = "(Annual Inspection)";
      }
    } else {
        next = ss.upcoming_weekly_inspection;
        type = "(Weekly Inspection)";
        if (ss.upcoming_monthly_inspection < next ) {
          next = ss.upcoming_monthly_inspection;
          type = "(Monthly Inspection)";
      } else if (ss.upcoming_quarterly_inspection < next ) {
        next = ss.upcoming_quarterly_inspection;
        type = "(Quarterly Inspection)";
      } else if (ss.upcoming_semiannual_inspection < next) {
        next = ss.upcoming_semiannual_inspection;
        type = "(Semi-Annual Inspection)";
      } else if (ss.upcoming_annual_inspection < next) {
        next = ss.upcoming_annual_inspection;
        type = "(Annual Inspection)";
      }
    }
    // dates are in UTC so creating date object (nd = newDate) from date string (next) and displaying it in local time
    const nd = new Date(next);
    return (
      <p>Next Inspection: {nd.toLocaleDateString().split("T")[0]} {type}</p>
    )
  }

  render() {
    const {isDeleted} = this.state;
    if (isDeleted) {
      return <Redirect to={{ pathname: '/SprinklerSystemList', state: this.props.location.state}}/>
    }
    const {building, ss} = this.props.location.state;
    const tableClass = ss.system_type === "Wet" ? 'hide' : 'table table-striped';
    const headerClass = ss.system_type === "Wet" ? 'hide' : '';
    return (
      <Fragment>
          <h2>Sprinkler System: {ss.id}</h2>
          <p>Type: {ss.system_type}</p>
          <p>Located in: {building.name}</p>
          {this.nextInspection(ss)}
				    <Button className={"btn btn--small"} onClick={() => {
              if(window.confirm('Are you sure you want to DELETE this asset? If you do, all inspections and notes related to it will be gone.')) {
                this.deleteSprinklerSystem(ss.id);
              }}}>
              Delete
            </Button>
          <Link to={{ pathname: '/SSInspection', state: {building: building, ss: ss}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Perform Inspection</Button>
          </Link>
          <Link to={{ pathname: '/SSReport', state: {building: building, ss: ss, inspections: this.props.SSInspecs}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Generate Report</Button>
          </Link>
          <table className={tableClass}>
            <caption>Weekly Inspections (Only for Dry and Pre-action)</caption>
            <thead>
              <tr>
                <th>Inspection Date</th>
                <th className={headerClass}>Air Pressure</th>
                <th>Water Pressure</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
                {this.props.SSInspecs.map(i => this.parseWeeklyInspections(i))}
            </tbody>
          </table>
          <table className="table table-striped">
            <caption>Monthly Inspections</caption>
            <thead>
              <tr>
                <th>Inspection Date</th>
                <th className={headerClass}>Air Pressure</th>
                <th>Water Pressure</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
                {this.props.SSInspecs.map(i => this.parseMonthlyInspections(i))}
            </tbody>
          </table>
          <table className="table table-striped">
            <caption>Quarterly Inspections</caption>
            <thead>
              <tr>
                <th>Inspection Date</th>
                <th className={headerClass}>Air Pressure</th>
                <th>Water Pressure</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
                {this.props.SSInspecs.map(i => this.parseQuarterlyInspections(i))}
            </tbody>
          </table>
          <table className="table table-striped">
            <caption>Semi-Annual Inspections</caption>
            <thead>
              <tr>
                <th>Inspection Date</th>
                <th className={headerClass}>Air Pressure</th>
                <th>Water Pressure</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
                {this.props.SSInspecs.map(i => this.parseSemiAnnualInspections(i))}
            </tbody>
          </table>
          <table className="table table-striped">
            <caption>Annual Inspections</caption>
            <thead>
              <tr>
                <th>Inspection Date</th>
                <th className={headerClass}>Air Pressure</th>
                <th>Water Pressure</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
                {this.props.SSInspecs.map(i => this.parseAnnualInspections(i))}
            </tbody>
          </table>
          <div>
            <h5>Notes</h5>
            <SSNotes ss={ss}/>
            <ul>
                {this.props.SSNotes.map((n) => 
                <li key={n.id}>
                  {n.note}
                  <button className={"btn btn--small"} onClick={() => {
                    if(window.confirm('Are you sure you want to DELETE this note? If you do, it cannot be retrieved.')) {
                      this.deleteNote(n.id);
                    }}}>
                      Delete Note
                  </button>
                </li>)}
            </ul>
          </div>
          <Link to={{ pathname: '/SprinklerSystemList', state: {building: building}}}>
				<Button className={"btn btn--back"} onClick={() => console.log(building)}>Back</Button>
		  </Link>
      </Fragment>
      );
    }
  }
  
  const mapStateToProps = (state) => ({
    SSInspecs: state.SprinklerInspecs.SSInspecs,
    SSNotes: state.SprinklerNotes.SSNotes,
  });

  export default withRouter(connect(mapStateToProps, { deleteSprinklerSystem, getSprinklerSysInspecs, getSSNotesById, deleteSSNote })(SprinklerSystem));
