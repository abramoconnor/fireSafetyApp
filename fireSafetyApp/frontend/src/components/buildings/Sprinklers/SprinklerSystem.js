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
    isWet: false,
    sortConfig: {
      field: 'date_tested',
      wdirection: 'ascending',
      mdirection: 'ascending',
      qdirection: 'ascending',
      sdirection: 'ascending',
      ydirection: 'ascending',
    },
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

  convertToLocalTime = (d) => {
    const nd = new Date(d);
    return nd.toLocaleDateString().split("T")[0]
  }

  // if user clicked field a second time, they want to change the direction of sort
  // default is ascending
  requestSort = (field, type) => {
    const {sortConfig} = this.state;
    if (type === "weekly") {
      if (sortConfig.field === field && sortConfig.wdirection === 'ascending') {
        this.setState({sortConfig: {field: field, wdirection: 'descending'}});
      } else {
        this.setState({sortConfig: {field: field, wdirection: 'ascending'}});
      }
    }
    else if (type === "monthly") {
      if (sortConfig.field === field && sortConfig.mdirection === 'ascending') {
        this.setState({sortConfig: {field: field, mdirection: 'descending'}});
      } else {
        this.setState({sortConfig: {field: field, mdirection: 'ascending'}});
      }
    }
    else if (type === "quarterly") {
      if (sortConfig.field === field && sortConfig.qdirection === 'ascending') {
        this.setState({sortConfig: {field: field, qdirection: 'descending'}});
      } else {
        this.setState({sortConfig: {field: field, qdirection: 'ascending'}});
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

  parseWeeklyInspections = () => {
    if (!this.props.SSInspecs) return;
    else {
      const {sortConfig} = this.state;
      const sortedWeekly = this.props.SSInspecs.filter(i => i.inspection_type === "weekly");
      sortedWeekly.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.wdirection === 'ascending' ? -1 : 1;
        } else if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.wdirection === 'ascending' ? 1 : -1;
        } else {
          return 0;
        }
      });
      return (
        <tbody>
          {sortedWeekly.map(w => 
            <tr key={w.id}>
              <td>{new Date(w.date_tested).toLocaleDateString().split("T")[0]}</td>
              <td>{w.air_pressure}</td>
              <td>{w.water_pressure}</td>
              <td>{w.tester}</td>
            </tr>
        )}
        </tbody>
      );
    }
  }

  parseMonthlyInspections = () => {
    if (!this.props.SSInspecs) return;
    else {
      const {ss} = this.props.location.state;
      const rowClass = ss.system_type === "Wet" ? 'hide' : '';
      const {sortConfig} = this.state;
      const sortedMonthly = this.props.SSInspecs.filter(i => i.inspection_type === "monthly");
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
          {sortedMonthly.map(i => 
            <tr key={i.id}>
              <td>{new Date(i.date_tested).toLocaleDateString().split("T")[0]}</td>
              <td className={rowClass}>{i.air_pressure}</td>
              <td>{i.water_pressure}</td>
              <td>{i.tester}</td>
            </tr>
        )}
        </tbody>
      );
    }
  }

  parseQuarterlyInspections = () => {
    if (!this.props.SSInspecs) return;
    else {
      const {ss} = this.props.location.state;
      const rowClass = ss.system_type === "Wet" ? 'hide' : '';
      const {sortConfig} = this.state;
      const sortedQuarterly = this.props.SSInspecs.filter(i => i.inspection_type === "quarterly");
      sortedQuarterly.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.qdirection === 'ascending' ? -1 : 1;
        } else if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.qdirection === 'ascending' ? 1 : -1;
        } else {
          return 0;
        }
      });
      return (
        <tbody>
          {sortedQuarterly.map(i => 
            <tr key={i.id}>
              <td>{new Date(i.date_tested).toLocaleDateString().split("T")[0]}</td>
              <td className={rowClass}>{i.air_pressure}</td>
              <td>{i.water_pressure}</td>
              <td>{i.tester}</td>
            </tr>
        )}
        </tbody>
      );
    }
  }

  parseSemiAnnualInspections = () => {
    if (!this.props.SSInspecs) return;
    else {
      const {ss} = this.props.location.state;
      const rowClass = ss.system_type === "Wet" ? 'hide' : '';
      const {sortConfig} = this.state;
      const sortedSemi = this.props.SSInspecs.filter(i => i.inspection_type === "semiannual");
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
          {sortedSemi.map(i => 
            <tr key={i.id}>
              <td>{new Date(i.date_tested).toLocaleDateString().split("T")[0]}</td>
              <td className={rowClass}>{i.air_pressure}</td>
              <td>{i.water_pressure}</td>
              <td>{i.tester}</td>
            </tr>
        )}
        </tbody>
      );
    }
  }

  parseAnnualInspections = () => {
    if (!this.props.SSInspecs) return;
    else {
      const {ss} = this.props.location.state;
      const rowClass = ss.system_type === "Wet" ? 'hide' : '';
      const {sortConfig} = this.state;
      const sortedAnnual = this.props.SSInspecs.filter(i => i.inspection_type === "annual");
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
          {sortedAnnual.map(i => 
            <tr key={i.id}>
              <td>{new Date(i.date_tested).toLocaleDateString().split("T")[0]}</td>
              <td className={rowClass}>{i.air_pressure}</td>
              <td>{i.water_pressure}</td>
              <td>{i.tester}</td>
            </tr>
        )}
        </tbody>
      );
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
      <p className="center red">Next Inspection: {nd.toLocaleDateString().split("T")[0]} {type}</p>
    )
  }

  render() {
    const {isDeleted, sortConfig} = this.state;
    if (isDeleted) {
      return <Redirect to={{ pathname: '/SprinklerSystemList', state: this.props.location.state}}/>
    }
    const {building, ss} = this.props.location.state;
    const tableClass = ss.system_type === "Wet" ? 'hide' : 'table table-striped';
    const headerClass = ss.system_type === "Wet" ? 'hide' : '';
    const wButtonLabel = sortConfig.wdirection === 'ascending' ? '(asc)' : '(desc)';
    const mButtonLabel = sortConfig.mdirection === 'ascending' ? '(asc)' : '(desc)';
    const qButtonLabel = sortConfig.qdirection === 'ascending' ? '(asc)' : '(desc)';
    const sButtonLabel = sortConfig.sdirection === 'ascending' ? '(asc)' : '(desc)';
    const yButtonLabel = sortConfig.ydirection === 'ascending' ? '(asc)' : '(desc)';
    return (
      <Fragment>
          <h2 className="center">Sprinkler System Covers: {ss.coverage}</h2>
          <p className="center">Type: {ss.system_type}</p>
          <p className="center">Located in: {building.name}</p>
          {this.nextInspection(ss)}

           <div className ="grid">
          <Link to={{ pathname: '/SSInspection', state: {building: building, ss: ss}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Perform Inspection</Button>
          </Link>
          <Link to={{ pathname: '/SSReport', state: {building: building, ss: ss, inspections: this.props.SSInspecs, notes: this.props.SSNotes}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Generate Report</Button>
          </Link>
          </div> 

          <div className={"black container center table-text"}>Weekly Inspections (Only for Dry and Pre-action)</div>
          <div className={"tableScroll"}>
          <table className={tableClass}>
            <thead>
              <tr>
                <th>
                    <button type="button" className="btn--table" onClick={() => this.requestSort('date_tested', 'weekly')}>Inspection Date {wButtonLabel}</button>
                </th>
                <th className={headerClass}>Air Pressure (PSI)</th>
                <th>Water Pressure (PSI)</th>
                <th>Performed By</th>
              </tr>
            </thead>
            {this.parseWeeklyInspections()}
          </table>
          </div>

          <div className={"black container center table-text"}>Monthly Inspections</div>
          <div className={"tableScroll"}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                    <button type="button" className="btn--table" onClick={() => this.requestSort('date_tested', 'monthly')}>Inspection Date {mButtonLabel}</button>
                </th>
                <th className={headerClass}>Air Pressure (PSI)</th>
                <th>Water Pressure (PSI)</th>
                <th>Performed By</th>
              </tr>
            </thead>
            {this.parseMonthlyInspections()}
          </table>
          </div>

          
          <div className={"black container center table-text"}>Quarterly Inspections</div>
          <div className={"tableScroll"}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                    <button type="button" className="btn--table" onClick={() => this.requestSort('date_tested', 'quarterly')}>Inspection Date {qButtonLabel}</button>
                </th>
                <th className={headerClass}>Air Pressure (PSI)</th>
                <th>Water Pressure (PSI)</th>
                <th>Performed By</th>
              </tr>
            </thead>
            {this.parseQuarterlyInspections()}
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
                <th className={headerClass}>Air Pressure (PSI)</th>
                <th>Water Pressure (PSI)</th>
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
                <th className={headerClass}>Air Pressure (PSI)</th>
                <th>Water Pressure (PSI)</th>
                <th>Performed By</th>
              </tr>
            </thead>
            {this.parseAnnualInspections()}
          </table>
          </div>
          
          <div className={"black container center table-text"}>Notes</div>
          <div>
            <div className="container">
            <SSNotes ss={ss}/>
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
                    {this.props.SSNotes.map(n =>
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

          <div className="right">
          <Button className={"btn btn--small"} onClick={() => {
              if(window.confirm('Are you sure you want to DELETE this asset? If you do, all inspections and notes related to it will be gone.')) {
                this.deleteSprinklerSystem(ss.id);
              }}}>
              Delete
          </Button>
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
