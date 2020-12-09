import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteFE, getFEInspecsById } from '../../../actions/FEs';
import {getFENotesById, deleteFENote} from "../../../actions/notes"
import { Link, withRouter, Redirect } from 'react-router-dom';
import {Button} from "react-bootstrap";
import FENotes from "./addFENote";

export class FireExtinguisher extends Component {
  state = {
    isDeleted: false,
    sortConfig: {
      field: 'date_tested',
      mdirection: 'ascending',
      ydirection: 'ascending',
      sixdirection: 'ascending',
      twelvedirection: 'ascending'
    },
  };

  static propTypes = {
    FEInspecs: PropTypes.array.isRequired,
    FENotes: PropTypes.array.isRequired,
    getFENotesById: PropTypes.func.isRequired,
    getFEInspecsById: PropTypes.func.isRequired,
    deleteFENote: PropTypes.func.isRequired,
    deleteFE: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getFEInspecsById(this.props.location.state.fe.id);
    this.props.getFENotesById(this.props.location.state.fe.id);
  }

  deleteFireExtinguisher = (id) => {
    this.props.deleteFE(id);
    this.setState({isDeleted: true})
  }
  
  deleteNote = (id) => {
    this.props.deleteFENote(id);
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
    else if (type === "6Year") {
      if (sortConfig.field === field && sortConfig.sixdirection === 'ascending') {
        this.setState({sortConfig: {field: field, sixdirection: 'descending'}});
      } else {
        this.setState({sortConfig: {field: field, sixdirection: 'ascending'}});
      }
    }
    else if (type === "12Year") {
      if (sortConfig.field === field && sortConfig.twelvedirection === 'ascending') {
        this.setState({sortConfig: {field: field, twelvedirection: 'descending'}});
      } else {
        this.setState({sortConfig: {field: field, twelvedirection: 'ascending'}});
      }
    }
  }

  parseMonthlyInspections = () => {
    if (!this.props.FEInspecs) return;
    else {
      const {sortConfig} = this.state;
      const sortedMonthly = this.props.FEInspecs.filter(i => i.inspection_type === "monthly");
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

  parseAnnualInspections = () => {
    if (!this.props.FEInspecs) return;
    else {
      const {sortConfig} = this.state;
      const sortedAnnual = this.props.FEInspecs.filter(i => i.inspection_type === "annual");
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

  parse6YearServices = () => {
    if (!this.props.FEInspecs) return;
    else {
      const {sortConfig} = this.state;
      const sorted6Year = this.props.FEInspecs.filter(i => i.inspection_type === "6Year");
      sorted6Year.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.sixdirection === 'ascending' ? -1 : 1;
        } else if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.sixdirection === 'ascending' ? 1 : -1;
        } else {
          return 0;
        }
      });
      return (
        <tbody>
          {sorted6Year.map(m => 
            <tr key={m.id}>
              <td>{new Date(m.date_tested).toLocaleDateString().split("T")[0]}</td>
              <td>{m.tester}</td>
            </tr>
        )}
        </tbody>
      );
    }
  }

  parse12YearTests = () => {
    if (!this.props.FEInspecs) return;
    else {
      const {sortConfig} = this.state;
      const sorted12Year = this.props.FEInspecs.filter(i => i.inspection_type === "12Year");
      sorted12Year.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.twelvedirection === 'ascending' ? -1 : 1;
        } else if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.twelvedirection === 'ascending' ? 1 : -1;
        } else {
          return 0;
        }
      });
      return (
        <tbody>
          {sorted12Year.map(m => 
            <tr key={m.id}>
              <td>{new Date(m.date_tested).toLocaleDateString().split("T")[0]}</td>
              <td>{m.tester}</td>
            </tr>
        )}
        </tbody>
      );
    }
  }

  nextInspection = (fe) => {
    let next = fe.upcoming_monthly_inspection;
    let type = "(Monthly Inspection)";
    if (fe.upcoming_annual_inspection < next ) {
      next = fe.upcoming_annual_inspection;
      type = "(Annual Inspection)";
    } else if (fe.upcoming_6year_service < next) {
      next = fe.upcoming_6year_service;
      type = "(6 Year Service)";
    } else if (fe.upcoming_12year_test < next) {
      next = fe.upcoming_12year_test;
      type = "(12 Year Test)";
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
    const {isDeleted} = this.state;
    if (isDeleted) {
      return <Redirect to={{ pathname: '/FireExtinguisherList', state: this.props.location.state}}/>
    }
    const {building, fe} = this.props.location.state;
    const mButtonLabel = this.state.sortConfig.mdirection === 'ascending' ? '(asc)' : '(desc)';
    const yButtonLabel = this.state.sortConfig.ydirection === 'ascending' ? '(asc)' : '(desc)';
    const sixButtonLabel = this.state.sortConfig.sixdirection === 'ascending' ? '(asc)' : '(desc)';
    const twelveButtonLabel = this.state.sortConfig.twelvedirection === 'ascending' ? '(asc)' : '(desc)';
    return (
      <Fragment>
          <h2 className="center">Fire Extinguisher: {fe.exnum}</h2>
          <p className="center">Location: {building.name}</p>
          {this.nextInspection(fe)}
				    
          <Link to={{ pathname: '/FEInspection', state: {building: building, fe: fe}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Perform Inspection</Button>
          </Link>
          <Link to={{ pathname: '/FEReport', state: {building: building, fe: fe, notes: this.props.FENotes}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Generate Report</Button>
          </Link>
          <Link to={{ pathname: '/FETransfer', state: {building: building, fe: fe}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Transfer Asset</Button>
          </Link>
          <p className={"black"}>Monthly Inspections</p>
          <div className={"tableScroll"}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>
                    <button type="button" onClick={() => this.requestSort('date_tested', 'monthly')}>Inspection Date {mButtonLabel}</button>
                  </th>
                  <th>Performed By</th>
                </tr>
              </thead>
              {this.parseMonthlyInspections()}
            </table>
          </div>
          <p className={"black"}>Annual Inspections</p>
          <div className={"tableScroll"}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>
                    <button type="button" onClick={() => this.requestSort('date_tested', 'annual')}>Inspection Date {yButtonLabel}</button>
                  </th>
                  <th className="align">Performed By</th>
                </tr>
              </thead>
              {this.parseAnnualInspections()}
            </table>
          </div>
          <p className={"black"}>6-Year Services</p>
          <div className={"tableScroll"}>
            <table className="table table-striped">
              <thead>
                <tr>
                <th>
                    <button type="button" onClick={() => this.requestSort('date_tested', '6Year')}>Service Date {sixButtonLabel}</button>
                  </th>
                  <th>Performed By</th>
                </tr>
              </thead>
              {this.parse6YearServices()}
            </table>
          </div>
          <p className={"black"}>12-Year Tests</p>
          <div className={"tableScroll"}>
            <table className="table table-striped">
              <thead>
                <tr>
                <th>
                    <button type="button" onClick={() => this.requestSort('date_tested', '12Year')}>Test Date {twelveButtonLabel}</button>
                  </th>
                  <th>Performed By</th>
                </tr>
              </thead>
              {this.parse12YearTests()}
            </table>
          </div>
          <div>
            <h5>Notes</h5>
            <FENotes fe={fe}/>
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
                    {this.props.FENotes.map(n => 
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
          <div className={"right"}>
          <Button className={"btn btn--small"} onClick={() => {
              if(window.confirm('Are you sure you want to DELETE this asset? If you do, all inspections and notes related to it will be gone.')) {
                this.deleteFireExtinguisher(fe.id);
              }}}>
              Delete Asset
            </Button>
          </div>
          <Link to={{ pathname: '/FireExtinguisherList', state: {building: building}}}>
				<Button className={"btn btn--back"}>Back</Button>
		  </Link>
      </Fragment>
      );
    }
  }
  
  const mapStateToProps = (state) => ({
    FEInspecs: state.FEInspecs.FEInspecs,
    FENotes: state.FENotes.FENotes,
  });

  export default withRouter(connect(mapStateToProps, { deleteFE, getFEInspecsById, getFENotesById, deleteFENote })(FireExtinguisher));
