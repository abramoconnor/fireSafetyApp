import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPumpInspection, updatePumpInspectionDate } from '../../../actions/Pumps';
import {createPumpNote} from "../../../actions/notes"
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

export class PumpInspection extends Component {
  state = {
    type: 'monthly',
    note: '',
    suction_pressure: '',
    discharge_pressure: '',
    run_time: '',
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    createPumpInspection: PropTypes.func.isRequired,
    updatePumpInspectionDate: PropTypes.func.isRequired,
    createPumpNote: PropTypes.func.isRequired
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { user } = this.props.auth;
    let fire_pump = this.props.location.state.pump;
    let inspection = {
      suction_pressure: this.state.suction_pressure,
      discharge_pressure: this.state.discharge_pressure,
      run_time: this.state.run_time,
      inspection_type: this.state.type,
      date_tested: new Date(),
      tester: `${user.first_name} ${user.last_name}`,
      fire_pump: this.props.location.state.pump.id
    };
    this.props.createPumpInspection(inspection);
    this.props.updatePumpInspectionDate(fire_pump, inspection);
    if (this.state.note) {
      let n = {
        note: this.state.note,
        fire_pump: this.props.location.state.pump.id
      }
      this.props.createPumpNote(n);
    }
    this.setState({ 
      type: 'monthly', 
      note: '', 
      suction_pressure: '',
      discharge_pressure: '',
      run_time: ''
    });
  }
    
  render() {
    const {building, pump} = this.props.location.state
    const {type, note, suction_pressure, discharge_pressure, run_time} = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Fire Pump Inspection Form</h2>
        <h5>Building: {building.name}</h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Type of Inspection</label>
            <select className="form-control" value={type} name="type" onChange={this.onChange}>
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
            </select>
          </div>
          <div className="form-group">
            <label>Suction Pressure (PSI)</label>
            <input
              className="form-control"
              type="text"
              name="suction_pressure"
              onChange={this.onChange}
              value={suction_pressure}
            />
          </div>
          <div className="form-group">
            <label>Discharge Pressure (PSI)</label>
            <input
              className="form-control"
              type="text"
              name="discharge_pressure"
              onChange={this.onChange}
              value={discharge_pressure}
            />
          </div>
          <div className="form-group">
            <label>Run Time (min)</label>
            <input
              className="form-control"
              type="text"
              name="run_time"
              onChange={this.onChange}
              value={run_time}
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
        <Link to={{ pathname: "/FirePump", state: {building: building, pump: pump}}}>
			<Button className={"btn btn--back"}>Back</Button>
		</Link>
  </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
export default connect(mapStateToProps, { createPumpInspection, updatePumpInspectionDate, createPumpNote })(PumpInspection);