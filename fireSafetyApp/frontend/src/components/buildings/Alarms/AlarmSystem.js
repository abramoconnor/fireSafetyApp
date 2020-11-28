import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAlarmSysInspecsById, deleteAlarmSystem } from '../../../actions/Alarms';
import {getASNotesById, deleteASNote} from "../../../actions/notes"
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";
import ASNotes from "./AlarmSystemNotes";

export class AlarmSystem extends Component {
  static propTypes = {
    ASInspecs: PropTypes.array.isRequired,
    ASNotes: PropTypes.array.isRequired,
    getASNotesById: PropTypes.func.isRequired,
    getAlarmSysInspecsById: PropTypes.func.isRequired,
    deleteASNote: PropTypes.func.isRequired,
    deleteAlarmSystem: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAlarmSysInspecsById(this.props.location.state.AlarmSystem.id);
    this.props.getASNotesById(this.props.location.state.AlarmSystem.id);
  }

  deleteNote = (id) => {
    this.props.deleteASNote(id);
  }

  parseMonthlyInspections = (i) => {
    const nd = new Date(i.date_tested);
    if (i.inspection_type === "monthly") {
        return (
            <tr key={i.id}>
                <td>{nd.toLocaleDateString().split("T")[0]}</td>
                <td>{i.tester}</td>
            </tr>
        )
    }
  }

  parseSemiAnnualInspections = (i) => {
    const nd = new Date(i.date_tested);
    if (i.inspection_type === "semiannual") {
        return (
            <tr key={i.id}>
                <td>{nd.toLocaleDateString().split("T")[0]}</td>
                <td>{i.tester}</td>
            </tr>
        )
    }
  }

  parseAnnualInspections = (i) => {
    const nd = new Date(i.date_tested);
    if (i.inspection_type === "annual") {
        return (
            <tr key={i.id}>
                <td>{nd.toLocaleDateString().split("T")[0]}</td>
                <td>{i.tester}</td>
            </tr>
        )
    }
  }

  nextInspection = (as) => {
    let next = as.upcoming_monthly_inspection;
    let type = "(Monthly Inspection)";
    if (as.upcoming_semiannual_inspection < next ) {
      next = as.upcoming_semiannual_inspection;
      type = "(Semi-Annual Inspection)";
    } else if (as.upcoming_annual_inspection < next ) {
      next = as.upcoming_annual_inspection;
      type = "(Annual Inspection)";
    }
    // dates are in UTC so creating date object (nd = newDate) from date string (next) and displaying it in local time
    const nd = new Date(next);
    return (
      <p>Next Upcoming Inspection: {nd.toLocaleDateString().split("T")[0]} {type}</p>
    )
  }
  
  render() {
    const {building, AlarmSystem} = this.props.location.state;
    return (
      <Fragment>
          <h2>Fire Alarm System for {building.name}</h2>
          {this.nextInspection(AlarmSystem)}
          <Link to={{ pathname: '/ASInspection', state: {building: building, as: AlarmSystem}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Perform Inspection</Button>
          </Link>
          <Link to={{ pathname: '/ASReport', state: {building: building, as: AlarmSystem}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Generate Report</Button>
          </Link>   
          <table className="table table-striped">
            <caption>Monthly Inspections</caption>
            <thead>
              <tr>
                <th>Inspection Date</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
                {this.props.ASInspecs.map(i => this.parseMonthlyInspections(i))}
            </tbody>
          </table>
          <table className="table table-striped">
            <caption>Semi-Annual Inspections</caption>
            <thead>
              <tr>
                <th>Inspection Date</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
                {this.props.ASInspecs.map(i => this.parseSemiAnnualInspections(i))}
            </tbody>
          </table>
          <table className="table table-striped">
            <caption>Annual Inspections</caption>
            <thead>
              <tr>
                <th>Inspection Date</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
                {this.props.ASInspecs.map(i => this.parseAnnualInspections(i))}
            </tbody>
          </table>
          <div>
            <h5>Notes</h5>
            <ASNotes as={AlarmSystem}/>
            <ul>
                {this.props.ASNotes.map((n) => 
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
          <Link to={{ pathname: '/Assets', state:{building:building, AlarmSystem: AlarmSystem }}}>
						<Button 
						className={"btn btn--back"}
						onClick={() => {
							}}
							> Back
							</Button>
					</Link>
      </Fragment>
      );
    }
  }
  
  const mapStateToProps = (state) => ({
    ASInspecs: state.AlarmInspecs.AlarmSysInspecs,
    ASNotes: state.AlarmNotes.ASNotes
  });
  
  export default withRouter(connect(mapStateToProps, { getAlarmSysInspecsById, deleteAlarmSystem, getASNotesById, deleteASNote })(AlarmSystem));
