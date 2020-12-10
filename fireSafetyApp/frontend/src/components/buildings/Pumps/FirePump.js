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
      <p className="center red">Next Upcoming Inspection: {nd.toLocaleDateString().split("T")[0]} {type}</p>
    )
  }
  
  convertToLocalTime = (d) => {
    const nd = new Date(d);
    return nd.toLocaleDateString().split("T")[0]
  }

  render() {
    const {building, pump} = this.props.location.state;
    const mButtonLabel = this.state.sortConfig.mdirection === 'ascending' ? '(asc)' : '(desc)';
    const yButtonLabel = this.state.sortConfig.ydirection === 'ascending' ? '(asc)' : '(desc)';
    return (
      <Fragment>
          <h2 className="center">Fire Pump for {building.name}</h2>
          {this.nextInspection(pump)}
          
          <div className="grid">
          <Link to={{ pathname: '/PumpInspection', state: {building: building, pump: pump}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Perform Inspection</Button>
          </Link>
          <Link to={{ pathname: '/PumpReport', state: {building: building, pump: pump, notes: this.props.PumpNotes, inspections: this.props.PumpInspecs}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Generate Report</Button>
          </Link>  
          </div>

          <div className={"black container center table-text"}>Monthly Inspections</div>
          <div className={"tableScroll"}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                    <button type="button" className="btn--table" onClick={() => this.requestSort('date_tested', 'monthly')}>Inspection Date {mButtonLabel}</button>
                </th>
                <th>Suction Pressure (PSI)</th>
                <th>Discharge Pressure (PSI)</th>
                <th>Run Time (min)</th>
                <th>Performed By</th>
              </tr>
            </thead>
            {this.parseMonthlyInspections()}
          </table>
          </div>

          <div className={"black container center table-text"}>Annual Inspections</div>
          <div className={"tableScroll"}>
          <table className="table table-striped">       
            <thead>
              <tr>
                <th>
                    <button type="button"  className="btn--table" onClick={() => this.requestSort('date_tested', 'annual')}>Inspection Date {yButtonLabel}</button>
                </th>
                <th>Suction Pressure (PSI)</th>
                <th>Discharge Pressure (PSI)</th>
                <th>Run Time (min)</th>
                <th>Performed By</th>
              </tr>
            </thead>
            {this.parseAnnualInspections()}
          </table>
          </div>
          
          <div className={"black container center table-text"}>Notes</div>
          <div>
            <div className ="container">
            <PumpNotes pump={pump}/>
            </div>
            <div className={"noteScroll"}>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Note</th>
                    <th>Written By</th>
                    <th>Date Written</th>
                    <th/>
                  </tr>
                </thead>
                <tbody>
                    {this.props.PumpNotes.map(n => 
                      <tr key={n.id}>
                        <td className={"note"}>{n.note}</td>
                        <td>{n.author}</td>
                        <td>{this.convertToLocalTime(n.date_written)}</td>
                        <td>
                        <button className={"btn btn--small"} onClick={() => {
                            if(window.confirm('Are you sure you want to DELETE this note? If you do, it cannot be retrieved.')) {
                              this.deleteNote(n.id);
                            }}}>
                          Delete Note
                        </button>
                        </td>
                      </tr>  
                    )}
                </tbody>
              </table>
            </div>
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
