import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPumpInspecsById } from '../../../actions/Pumps';
import {getPumpNotesById, deletePumpNote} from "../../../actions/notes"
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";
import PumpNotes from "./PumpNotes";

export class FirePump extends Component {
  static propTypes = {
    PumpInspecs: PropTypes.array.isRequired,
    PumpNotes: PropTypes.array.isRequired,
    getPumpNotesById: PropTypes.func.isRequired,
    getPumpInspecsById: PropTypes.func.isRequired,
    deletePumpNote: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getPumpInspecsById(this.props.location.state.pump.id);
    this.props.getPumpNotesById(this.props.location.state.pump.id);
  }

  deleteNote = (id) => {
    this.props.deletePumpNote(id);
  }

  parseMonthlyInspections = (i) => {
    const nd = new Date(i.date_tested);
    if (i.inspection_type === "monthly") {
        return (
            <tr key={i.id}>
                <td>{nd.toLocaleDateString().split("T")[0]}</td>
                <td>{i.suction_pressure}</td>
                <td>{i.discharge_pressure}</td>
                <td>{i.run_time}</td>
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
                <td>{i.suction_pressure}</td>
                <td>{i.discharge_pressure}</td>
                <td>{i.run_time}</td>
                <td>{i.tester}</td>
            </tr>
        )
    }
  }

  nextInspection = (p) => {
    let next = p.upcoming_monthly_inspection;
    let type = "(Monthly Inspection)";
   if (p.upcoming_annual_inspection < next ) {
      next = p.upcoming_annual_inspection;
      type = "(Annual Inspection)";
    }
    // dates are in UTC so creating date object (nd = newDate) from date string (next) and displaying it in local time
    const nd = new Date(next);
    return (
      <p>Next Upcoming Inspection: {nd.toLocaleDateString().split("T")[0]} {type}</p>
    )
  }
  
  render() {
    const {building, pump} = this.props.location.state;
    return (
      <Fragment>
          <h2>Fire Pump for {building.name}</h2>
          {this.nextInspection(pump)}
          <Link to={{ pathname: '/PumpInspection', state: {building: building, pump: pump}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Perform Inspection</Button>
          </Link>
          <Link to={{ pathname: '/PumpReport', state: {building: building, pump: pump, notes: this.props.PumpNotes, inspections: this.props.PumpInspecs}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Generate Report</Button>
          </Link>   
          <table className="table table-striped">
            <caption>Monthly Inspections</caption>
            <thead>
              <tr>
                <th>Inspection Date</th>
                <th>Suction Pressure (PSI)</th>
                <th>Discharge Pressure (PSI)</th>
                <th>Run Time (min)</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
                {this.props.PumpInspecs.map(i => this.parseMonthlyInspections(i))}
            </tbody>
          </table>
          <table className="table table-striped">
            <caption>Annual Inspections</caption>
            <thead>
              <tr>
                <th>Inspection Date</th>
                <th>Suction Pressure (PSI)</th>
                <th>Discharge Pressure (PSI)</th>
                <th>Run Time (min)</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
                {this.props.PumpInspecs.map(i => this.parseAnnualInspections(i))}
            </tbody>
          </table>
          <div>
            <h5>Notes</h5>
            <PumpNotes pump={pump}/>
            <ul>
                {this.props.PumpNotes.map((n) => 
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
          <Link to={{ pathname: '/Assets', state:{building:building, pump: pump }}}>
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
    PumpInspecs: state.PumpInsp.PumpInspecs,
    PumpNotes: state.PumpNotes.PumpNotes
  });
  
  export default withRouter(connect(mapStateToProps, { getPumpInspecsById, getPumpNotesById, deletePumpNote })(FirePump));
