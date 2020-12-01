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

  parse6YearServices = (i) => {
    const nd = new Date(i.date_tested);
    if (i.inspection_type === "6year") {
        return (
            <tr key={i.id}>
                <td>{nd.toLocaleDateString().split("T")[0]}</td>
                <td>{i.tester}</td>
            </tr>
        )
    }
  }

  parse12YearTests = (i) => {
    const nd = new Date(i.date_tested);
    if (i.inspection_type === "12year") {
        return (
            <tr key={i.id}>
                <td>{nd.toLocaleDateString().split("T")[0]}</td>
                <td>{i.tester}</td>
            </tr>
        )
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
      <p>Next Upcoming Inspection: {nd.toLocaleDateString().split("T")[0]} {type}</p>
    )
  }

  render() {
    const {isDeleted} = this.state;
    console.log(isDeleted);
    if (isDeleted) {
      return <Redirect to={{ pathname: '/FireExtinguisherList', state: this.props.location.state}}/>
    }
    const {building, fe} = this.props.location.state;
    return (
      <Fragment>
          {/* ???Blane put captions on top of table */}
          <h2>Fire Extinguisher: {fe.exnum}</h2>
          <p>Located in: {building.name}</p>
          {this.nextInspection(fe)}
				    <Button className={"btn btn--small"} onClick={() => {
              if(window.confirm('Are you sure you want to DELETE this asset? If you do, all inspections and notes related to it will be gone.')) {
                this.deleteFireExtinguisher(fe.id);
              }}}>
              Delete
            </Button>
          <Link to={{ pathname: '/FEInspection', state: {building: building, fe: fe}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Perform Inspection</Button>
          </Link>
          <Link to={{ pathname: '/FEReport', state: {building: building, fe: fe}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Generate Report</Button>
          </Link>
          <div>Monthly Inspections</div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Inspection Date</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
                {this.props.FEInspecs.map(i => this.parseMonthlyInspections(i))}
            </tbody>
          </table>
          <div>Annual Inspections</div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Inspection Date</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
                {this.props.FEInspecs.map(i => this.parseAnnualInspections(i))}
            </tbody>
          </table>
          <div>6-Year Services</div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Service Date</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
                {this.props.FEInspecs.map(i => this.parse6YearServices(i))}
            </tbody>
          </table>
          <div>12-Year Tests</div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Test Date</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
                {this.props.FEInspecs.map(i => this.parse12YearTests(i))}
            </tbody>
          </table>
          <div>
            <h5>Notes</h5>
            <FENotes fe={fe}/>
            <ul>
                {this.props.FENotes.map((n) => 
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
          <Link to={{ pathname: '/FireExtinguisherList', state: {building: building}}}>
				<Button className={"btn btn--back"} onClick={() => console.log(building)}>Back</Button>
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
