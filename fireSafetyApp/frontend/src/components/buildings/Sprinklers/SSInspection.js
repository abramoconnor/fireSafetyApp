import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createSSInspection, updateSSInspectionDate } from '../../../actions/Sprinklers';
import {createSSNote} from "../../../actions/notes"
import {createMessage} from "../../../actions/messages"
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

export class SSInspection extends Component {
  state = {
    type: 'monthly',
    note: '',
    air_pressure: '',
    water_pressure: '',
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    createSSInspection: PropTypes.func.isRequired,
    updateSSInspectionDate: PropTypes.func.isRequired,
    createSSNote: PropTypes.func.isRequired
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { user } = this.props.auth;
    let sprinkler_system = this.props.location.state.ss;
    if (this.state.type === 'weekly' && sprinkler_system.system_type === 'Wet') {
      this.props.createMessage({weekly: "Weekly inspections are not supported for this system type"})
    } else {
      let inspection = {
        air_pressure: this.state.air_pressure ? this.state.air_pressure : "N/A",
        water_pressure: this.state.water_pressure,
        inspection_type: this.state.type,
        date_tested: new Date(),
        tester: `${user.first_name} ${user.last_name}`,
        sprinkler_system: this.props.location.state.ss.id
      };
      this.props.createSSInspection(inspection);
      this.props.updateSSInspectionDate(sprinkler_system, inspection);
      if (this.state.note) {
        let n = {
          note: this.state.note,
          sprinkler_system: this.props.location.state.ss.id
        }
        this.props.createSSNote(n);
      }
    }
    this.setState({ type: 'monthly', note: '', air_pressure: '', water_pressure: ''});
  }
    
  render() {
    const {building, ss} = this.props.location.state
    const {type, note, air_pressure, water_pressure} = this.state;
    const inputClass = ss.system_type === "Wet" ? 'hide' : 'form-group';
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Sprinkler System Inspection Form</h2>
        <h5>System Covers: {ss.coverage}</h5>
        <h5>Type: {ss.system_type}</h5>
        <h5>Building: {building.name}</h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Type of Inspection</label>
            <select className="form-control" value={type} name="type" onChange={this.onChange}>
              <option value="weekly">Weekly (Dry and Pre-Action Only)</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>  
              <option value="semiannual">Semi-Annual</option>
              <option value="annual">Annual</option>
            </select>
          </div>
          <div className={inputClass}>
            <label>Air Pressure</label>
            <input
              className="form-control"
              type="text"
              name="air_pressure"
              onChange={this.onChange}
              value={air_pressure}
            />
          </div>
          <div className="form-group">
            <label>Water Pressure</label>
            <input
              className="form-control"
              type="text"
              name="water_pressure"
              onChange={this.onChange}
              value={water_pressure}
            />
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
        <Link to={{ pathname: "/SprinklerSystem", state: {building: building, ss: ss}}}>
			<Button className={"btn btn--back"}>Back</Button>
		</Link>
  </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
export default connect(mapStateToProps, { createSSInspection, updateSSInspectionDate, createSSNote, createMessage })(SSInspection);