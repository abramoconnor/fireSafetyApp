import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPumpInspecsById } from '../../../actions/Pumps';
import {getPumpNotesById, deletePumpNote} from "../../../actions/notes"
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";
import PumpNotes from "./PumpNotes";

export class FirePump extends Component {
  state = {
    sortConfig: {
      field: 'date_tested',
      mdirection: 'ascending',
      ydirection: 'ascending',
    },
  };

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

  // if user clicked field a second time, they want to change the direction of sort
  // default is ascending
  requestSort = (field, type) => {
    const {sortConfig} = this.state;
    if (type === "monthly") {
      if (sortConfig.field === field && sortConfig.mdirection === 'ascending') {
        this.setState({sortConfig: {field: field, mdirection: 'descending'}});
      } else {
        this.setState({sortConfig: {field: field, mdirection: 'ascending'}});
      }
    }
    else if (type === "annual") {
      if (sortConfig.field === field && sortConfig.ydirection === 'ascending') {
        this.setState({sortConfig: {field: field, ydirection: 'descending'}});
      } else {
        this.setState({sortConfig: {field: field, ydirection: 'ascending'}});
      }
    }
  }

  parseMonthlyInspections = () => {
    if (!this.props.PumpInspecs) return;
    else {
      const {sortConfig} = this.state;
      const sortedMonthly = this.props.PumpInspecs.filter(i => i.inspection_type === "monthly");
      sortedMonthly.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.mdirection === 'ascending' ? -1 : 1;
        } else if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.mdirection === 'ascending' ? 1 : -1;
        } else {
          return 0;
        }
      });
      return (
        <tbody>
          {sortedMonthly.map(m => 
            <tr key={m.id}>
              <td>{new Date(m.date_tested).toLocaleDateString().split("T")[0]}</td>
              <td>{m.suction_pressure}</td>
              <td>{m.discharge_pressure}</td>
              <td>{m.run_time}</td>
              <td>{m.tester}</td>
            </tr>
        )}
        </tbody>
      );
    }
  }

  parseAnnualInspections = () => {
    if (!this.props.PumpInspecs) return;
    else {
      const {sortConfig} = this.state;
      const sortedAnnual = this.props.PumpInspecs.filter(i => i.inspection_type === "annual");
      sortedAnnual.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.ydirection === 'ascending' ? -1 : 1;
        } else if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.ydirection === 'ascending' ? 1 : -1;
        } else {
          return 0;
        }
      });
      return (
        <tbody>
          {sortedAnnual.map(m => 
            <tr key={m.id}>
              <td>{new Date(m.date_tested).toLocaleDateString().split("T")[0]}</td>
              <td>{m.suction_pressure}</td>
              <td>{m.discharge_pressure}</td>
              <td>{m.run_time}</td>
              <td>{m.tester}</td>
            </tr>
        )}
        </tbody>
      );
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
    const mButtonLabel = this.state.sortConfig.mdirection === 'ascending' ? '(asc)' : '(desc)';
    const yButtonLabel = this.state.sortConfig.ydirection === 'ascending' ? '(asc)' : '(desc)';
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
                <th>
                    <button type="button" onClick={() => this.requestSort('date_tested', 'monthly')}>Inspection Date {mButtonLabel}</button>
                </th>
                <th>Suction Pressure (PSI)</th>
                <th>Discharge Pressure (PSI)</th>
                <th>Run Time (min)</th>
                <th>Performed By</th>
              </tr>
            </thead>
            {this.parseMonthlyInspections()}
          </table>
          <table className="table table-striped">
            <caption>Annual Inspections</caption>
            <thead>
              <tr>
                <th>
                    <button type="button" onClick={() => this.requestSort('date_tested', 'annual')}>Inspection Date {yButtonLabel}</button>
                </th>
                <th>Suction Pressure (PSI)</th>
                <th>Discharge Pressure (PSI)</th>
                <th>Run Time (min)</th>
                <th>Performed By</th>
              </tr>
            </thead>
            {this.parseAnnualInspections()}
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
