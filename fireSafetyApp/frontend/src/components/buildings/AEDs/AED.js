import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAED, getAEDInspecsById } from '../../../actions/AEDs';
import {getAEDNotesById, deleteAEDNote} from "../../../actions/notes"
import { Link, withRouter, Redirect } from 'react-router-dom';
import {Button} from "react-bootstrap";

export class FireExtinguisher extends Component {
  state = {
    isDeleted: false,
  };

  static propTypes = {
    AEDInspecs: PropTypes.array.isRequired,
    // AEDNotes: PropTypes.array.isRequired,
    getAEDNotesById: PropTypes.func.isRequired,
    getAEDInspecsById: PropTypes.func.isRequired,
    deleteAEDNote: PropTypes.func.isRequired,
    deleteAED: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAEDInspecsById(this.props.location.state.AED.id);
    this.props.getAEDNotesById(this.props.location.state.AED.id);
  }

  deleteFireExtinguisher = (id) => {
    this.props.deleteAED(id);
    this.setState({isDeleted: true})
  }
  
  // deleteNote = (id) => {
  //   this.props.deleteAEDNote(id);
  // }

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

  nextInspection = (AED) => {
    let next = AED.upcoming_monthly_inspection;
    let type = "(Monthly Inspection)";
    if (AED.upcoming_annual_inspection < next ) {
      next = AED.upcoming_annual_inspection;
      type = "(Annual Inspection)";
    } else if (AED.upcoming_6year_service < next) {
      next = AED.upcoming_6year_service;
      type = "(6 Year Service)";
    } else if (AED.upcoming_12year_test < next) {
      next = AED.upcoming_12year_test;
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
    const {building, AED} = this.props.location.state;
    return (
      <Fragment>
          <h2 className="center">Fire Extinguisher: {AED.exnum}</h2>
          <p className="center">Location: {building.name}</p>
          {this.nextInspection(AED)}
				    
          <Link to={{ pathname: '/AEDInspection', state: {building: building, AED: AED}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Perform Inspection</Button>
          </Link>
          <Link to={{ pathname: '/AEDReport', state: {building: building, AED: AED}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Generate Report</Button>
          </Link>
          <Link to={{ pathname: '/AEDTransfer', state: {building: building, AED: AED}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>TransAEDr Asset</Button>
          </Link>
          <p className={"black"}>Monthly Inspections</p>
          <div className={"tableScroll"}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Inspection Date</th>
                  <th>Performed By</th>
                </tr>
              </thead>
              <tbody>
                  {this.props.AEDInspecs.map(i => this.parseMonthlyInspections(i))}
              </tbody>
            </table>
          </div>
          <p className={"black"}>Annual Inspections</p>
          <div className={"tableScroll"}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Inspection Date</th>
                  <th className="align">Performed By</th>
                </tr>
              </thead>
              <tbody>
                  {this.props.AEDInspecs.map(i => this.parseAnnualInspections(i))}
              </tbody>
            </table>
          </div>
          <p className={"black"}>6-Year Services</p>
          <div className={"tableScroll"}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Service Date</th>
                  <th>Performed By</th>
                </tr>
              </thead>
              <tbody>
                  {this.props.AEDInspecs.map(i => this.parse6YearServices(i))}
              </tbody>
            </table>
          </div>
          <p className={"black"}>12-Year Tests</p>
          <div className={"tableScroll"}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Test Date</th>
                  <th>Performed By</th>
                </tr>
              </thead>
              <tbody>
                  {this.props.AEDInspecs.map(i => this.parse12YearTests(i))}
              </tbody>
            </table>
          </div>
          <div>
            <h5>Notes</h5>
            {/* <AEDNotes AED={AED}/>
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
                    {this.props.AEDNotes.map(n => 
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
          <div className={"right"}> */}
          <Button className={"btn btn--small"} onClick={() => {
              if(window.confirm('Are you sure you want to DELETE this asset? If you do, all inspections and notes related to it will be gone.')) {
                this.deleteFireExtinguisher(AED.id);
              }}}>
              Delete Asset
            </Button>
          </div>
          <Link to={{ pathname: '/FireExtinguisherList', state: {building: building}}}>
				<Button className={"btn btn--back"} onClick={() => console.log(building)}>Back</Button>
		  </Link>
      </Fragment>
      );
    }
  }
  
  const mapStateToProps = (state) => ({
    AEDInspecs: state.AEDInspecs.AEDInspecs,
    AEDNotes: state.AEDNotes.AEDNotes,
  });

  export default withRouter(connect(mapStateToProps, { deleteAED, getAEDInspecsById, getAEDNotesById, deleteAEDNote })(FireExtinguisher));
