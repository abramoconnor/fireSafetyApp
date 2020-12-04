import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAED, getAEDInspecsById } from '../../../actions/AEDs';
import {getAEDNotesById, deleteAEDNote} from "../../../actions/notes"
import { Link, withRouter, Redirect } from 'react-router-dom';
import {Button} from "react-bootstrap";
import AEDNote from "./AEDNote";

export class AED extends Component {
  state = {
    isDeleted: false,
  };

  static propTypes = {
    AEDInspecs: PropTypes.array.isRequired,
    AEDNotes: PropTypes.array.isRequired,
    getAEDNotesById: PropTypes.func.isRequired,
    getAEDInspecsById: PropTypes.func.isRequired,
    deleteAEDNote: PropTypes.func.isRequired,
    deleteAED: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAEDInspecsById(this.props.location.state.aed.id);
    this.props.getAEDNotesById(this.props.location.state.aed.id);
  }

  deleteAED = (id) => {
    this.props.deleteAED(id);
    this.setState({isDeleted: true})
  }
  
  deleteNote = (id) => {
    this.props.deleteAEDNote(id);
  }

  parseMonthlyInspections = () => {
    if (!this.props.AEDInspecs) return;
    else {
      const sortedMonthly = this.props.AEDInspecs.filter(i => i.inspection_type === "monthly");
      sortedMonthly.sort((a, b) => {
        if (a.date_tested < b.date_tested) {
          return 1;
        } else if (a.date_tested > b.date_tested) {
          return -1;
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

  nextInspection = (AED) => {
    let next = AED.upcoming_monthly_inspection;
    let type = "(Monthly Inspection)";
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
      return <Redirect to={{ pathname: '/AEDList', state: this.props.location.state}}/>
    }
    const {building, aed} = this.props.location.state;
    return (
      <Fragment>
          <h2 className="center">AED Location: {aed.location}</h2>
          <p className="center">Building: {building.name}</p>
          {this.nextInspection(aed)}
				    
          <Link to={{ pathname: '/AEDInspection', state: {building: building, aed: aed}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Perform Inspection</Button>
          </Link>
          <Link to={{ pathname: '/AEDReport', state: {building: building, aed: aed, notes: this.props.AEDNotes}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Generate Report</Button>
          </Link>
          <Link to={{ pathname: '/AEDLocation', state: {building: building, aed: aed}}}>
            <Button className={"btn btn--small"} onClick={() => {}}>Change Location</Button>
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
              {this.parseMonthlyInspections()}
            </table>
          </div>
          <div>
            <h5>Notes</h5>
            <AEDNote aed={aed}/>
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
          <div className={"right"}>
          <Button className={"btn btn--small"} onClick={() => {
              if(window.confirm('Are you sure you want to DELETE this asset? If you do, all inspections and notes related to it will be gone.')) {
                this.deleteAED(aed.id);
              }}}>
              Delete Asset
            </Button>
          </div>
          <Link to={{ pathname: '/AEDList', state: {building: building}}}>
				<Button className={"btn btn--back"}>Back</Button>
		  </Link>
      </Fragment>
      );
    }
  }
  
  const mapStateToProps = (state) => ({
    AEDInspecs: state.AEDInspecs.AEDInspecs,
    AEDNotes: state.AEDNotes.AEDNotes,
  });

  export default withRouter(connect(mapStateToProps, { deleteAED, getAEDInspecsById, getAEDNotesById, deleteAEDNote })(AED));
