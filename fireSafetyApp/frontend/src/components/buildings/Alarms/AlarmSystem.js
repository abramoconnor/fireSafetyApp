import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAlarmSysInspecsById } from '../../../actions/Alarms';
import {getASNotesById, deleteASNote} from "../../../actions/notes"
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";
import ASNotes from "./AlarmSystemNotes";

export class AlarmSystem extends Component {
  state = {
    sortConfig: {
      field: 'date_tested',
      mdirection: 'ascending',
      sdirection: 'ascending',
      ydirection: 'ascending',
    },
  };

  static propTypes = {
    ASInspecs: PropTypes.array.isRequired,
    ASNotes: PropTypes.array.isRequired,
    getASNotesById: PropTypes.func.isRequired,
    getAlarmSysInspecsById: PropTypes.func.isRequired,
    deleteASNote: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAlarmSysInspecsById(this.props.location.state.AlarmSystem.id);
    this.props.getASNotesById(this.props.location.state.AlarmSystem.id);
  }

  deleteNote = (id) => {
    this.props.deleteASNote(id);
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
    else if (type === "semiannual") {
      if (sortConfig.field === field && sortConfig.sdirection === 'ascending') {
        this.setState({sortConfig: {field: field, sdirection: 'descending'}});
      } else {
        this.setState({sortConfig: {field: field, sdirection: 'ascending'}});
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
    if (!this.props.ASInspecs) return;
    else {
      const {sortConfig} = this.state;
      const sortedMonthly = this.props.ASInspecs.filter(i => i.inspection_type === "monthly");
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
              <td>{m.tester}</td>
            </tr>
        )}
        </tbody>
      );
    }
  }

  parseSemiAnnualInspections = () => {
    if (!this.props.ASInspecs) return;
    else {
      const {sortConfig} = this.state;
      const sortedSemi = this.props.ASInspecs.filter(i => i.inspection_type === "semiannual");
      sortedSemi.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.sdirection === 'ascending' ? -1 : 1;
        } else if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.sdirection === 'ascending' ? 1 : -1;
        } else {
          return 0;
        }
      });
      return (
        <tbody>
          {sortedSemi.map(m => 
            <tr key={m.id}>
              <td>{new Date(m.date_tested).toLocaleDateString().split("T")[0]}</td>
              <td>{m.tester}</td>
            </tr>
        )}
        </tbody>
      );
    }
  }

  parseAnnualInspections = (i) => {
    if (!this.props.ASInspecs) return;
    else {
      const {sortConfig} = this.state;
      const sortedAnnual = this.props.ASInspecs.filter(i => i.inspection_type === "annual");
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
              <td>{m.tester}</td>
            </tr>
        )}
        </tbody>
      );
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
      <p className="center red">Next Upcoming Inspection: {nd.toLocaleDateString().split("T")[0]} {type}</p>
    )
  }
  
  convertToLocalTime = (d) => {
    const nd = new Date(d);
    return nd.toLocaleDateString().split("T")[0]
  }


  render() {
    const {building, AlarmSystem} = this.props.location.state;
    const mButtonLabel = this.state.sortConfig.mdirection === 'ascending' ? '(asc)' : '(desc)';
    const sButtonLabel = this.state.sortConfig.sdirection === 'ascending' ? '(asc)' : '(desc)';
    const yButtonLabel = this.state.sortConfig.ydirection === 'ascending' ? '(asc)' : '(desc)';
    return (
      <Fragment>
          <h2 className="center">Fire Alarm System for {building.name}</h2>
          {this.nextInspection(AlarmSystem)}

          <div className="grid">
          <Link to={{ pathname: '/ASInspection', state: {building: building, as: AlarmSystem}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Perform Inspection</Button>
          </Link>
          <Link to={{ pathname: '/ASReport', state: {building: building, as: AlarmSystem, notes: this.props.ASNotes}}}>
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
                <th>Performed By</th>
              </tr>
            </thead>
            {this.parseMonthlyInspections()}
          </table>
          </div>

          <div className={"black container center table-text"}>Semi-Annual Inspections</div>
          <div className={"tableScroll"}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                    <button type="button" className="btn--table" onClick={() => this.requestSort('date_tested', 'semiannual')}>Inspection Date {sButtonLabel}</button>
                </th>
                <th>Performed By</th>
              </tr>
            </thead>
            {this.parseSemiAnnualInspections()}
          </table>
          </div>

          <div className={"black container center table-text"}>Annual Inspections</div>
          <div className={"tableScroll"}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                    <button type="button" className="btn--table" onClick={() => this.requestSort('date_tested', 'annual')}>Inspection Date {yButtonLabel}</button>
                </th>
                <th>Performed By</th>
              </tr>
            </thead>
            {this.parseAnnualInspections()}
          </table>
          </div>

          <div className={"black container center table-text"}>Notes</div>
          <div>
            <div className ="container">
            <ASNotes AlarmSystem={AlarmSystem}/>
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
                    {this.props.ASNotes.map(n => 
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
  
  export default withRouter(connect(mapStateToProps, { getAlarmSysInspecsById, getASNotesById, deleteASNote })(AlarmSystem));
