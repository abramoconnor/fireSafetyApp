import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createFEInspection, updateFEInspectionDate } from '../../../actions/FEs';
import {createFENote} from "../../../actions/notes"
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const MAX_NOTE_LENGTH = 240;

export class FEInspection extends Component {
  state = {
    type: 'monthly',
    note: '',
    charsLeft: MAX_NOTE_LENGTH
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    createFEInspection: PropTypes.func.isRequired,
    updateFEInspectionDate: PropTypes.func.isRequired,
    createFENote: PropTypes.func.isRequired
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onChangeNote = (e) => {
    if (e.target.value.length > MAX_NOTE_LENGTH) {
        this.setState({charsLeft: "TOO MANY CHARACTERS"});
    } else {
        this.setState({charsLeft: MAX_NOTE_LENGTH - e.target.value.length})
    }
    this.setState({ [e.target.name]: e.target.value })
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { user } = this.props.auth;
    let fire_extinguisher = this.props.location.state.fe;
    let inspection = {
      inspection_type: this.state.type,
      date_tested: new Date(),
      tester: `${user.first_name} ${user.last_name}`,
      fire_extinguisher: this.props.location.state.fe.id
    };
    this.props.createFEInspection(inspection);
    this.props.updateFEInspectionDate(fire_extinguisher, inspection);
    if (this.state.note) {
      let n = {
        note: this.state.note,
        author: `${user.first_name} ${user.last_name}`,
        date_written: new Date(),
        fire_extinguisher: this.props.location.state.fe.id
      }
      this.props.createFENote(n);
    }
    this.setState({ type: 'monthly', note: '', charsLeft: MAX_NOTE_LENGTH});
  }
    
  render() {
    const {building, fe} = this.props.location.state
    const {type, note} = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Fire Extinguisher Inspection Form</h2>
        <h5>Extinguisher: {fe.exnum}</h5>
        <h5>Building: {building.name}</h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Type of Inspection</label>
            <select className="form-control" value={type} name="type" onChange={this.onChange}>
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
              <option value="6year">6 Year</option>
              <option value="12year">12 Year</option>
            </select>
          </div>
          <div className="form-group">
            <label>Notes (Optional)</label>
            <input
              className="form-control"
              type="text"
              name="note"
              onChange={this.onChangeNote}
              value={note}
            />
          </div>
          <p>Characters Left: {this.state.charsLeft}</p>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <Link to={{ pathname: "/FireExtinguisher", state: {building: building, fe: fe}}}>
			<Button className={"btn btn--back"}>Back</Button>
		</Link>
  </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
export default connect(mapStateToProps, { createFEInspection, updateFEInspectionDate, createFENote })(FEInspection);