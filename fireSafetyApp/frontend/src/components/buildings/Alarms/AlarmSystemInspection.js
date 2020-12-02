import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createASInspection, updateASInspectionDate } from '../../../actions/Alarms';
import {createASNote} from "../../../actions/notes"
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

export class ASInspection extends Component {
  state = {
    type: 'monthly',
    note: '',
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    createASInspection: PropTypes.func.isRequired,
    updateASInspectionDate: PropTypes.func.isRequired,
    createASNote: PropTypes.func.isRequired
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { user } = this.props.auth;
    let alarm_system = this.props.location.state.as;
    let inspection = {
      inspection_type: this.state.type,
      date_tested: new Date(),
      tester: `${user.first_name} ${user.last_name}`,
      alarm_system: this.props.location.state.as.id
    };
    this.props.createASInspection(inspection);
    this.props.updateASInspectionDate(alarm_system, inspection);
    if (this.state.note) {
      let n = {
        note: this.state.note,
        alarm_system: this.props.location.state.as.id
      }
      this.props.createASNote(n);
    }
    this.setState({ type: '', note: ''});
  }
    
  render() {
    const {building, as} = this.props.location.state
    const {type, note} = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Alarm System Inspection Form</h2>
        <h5>Building: {building.name}</h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Type of Inspection</label>
            <select className="form-control" value={type} name="type" onChange={this.onChange}>
              <option value="monthly">Monthly</option>
              <option value="semiannual">Semi-Annual</option>
              <option value="annual">Annual</option>
            </select>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <input
              className="form-control"
              type="text"
              name="note"
              onChange={this.onChange}
              value={note}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <Link to={{ pathname: "/AlarmSystem", state: {building: building, AlarmSystem: as}}}>
			<Button className={"btn btn--back"}>Back</Button>
		</Link>
  </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
export default connect(mapStateToProps, { createASInspection, updateASInspectionDate, createASNote })(ASInspection);