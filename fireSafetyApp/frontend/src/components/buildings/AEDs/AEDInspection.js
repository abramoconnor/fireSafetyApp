import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createAEDInspection, updateAEDInspectionDate } from '../../../actions/AEDs';
import {createAEDNote} from "../../../actions/notes"
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const MAX_NOTE_LENGTH = 240;

export class AEDInspection extends Component {
  state = {
    type: 'monthly',
    note: '',
    charsLeft: MAX_NOTE_LENGTH
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    AEDs: PropTypes.array.isRequired,
    createAEDInspection: PropTypes.func.isRequired,
    updateAEDInspectionDate: PropTypes.func.isRequired,
    createAEDNote: PropTypes.func.isRequired
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
    let aed = this.props.location.state.aed;
    let inspection = {
      inspection_type: this.state.type,
      date_tested: new Date(),
      tester: `${user.first_name} ${user.last_name}`,
      aed: this.props.location.state.aed.id
    };
    this.props.createAEDInspection(inspection);
    this.props.updateAEDInspectionDate(aed, inspection);
    if (this.state.note) {
      let n = {
        note: this.state.note,
        author: `${user.first_name} ${user.last_name}`,
        date_written: new Date(),
        aed: this.props.location.state.aed.id
      }
      this.props.createAEDNote(n);
    }
    this.setState({ type: 'monthly', note: '', charsLeft: MAX_NOTE_LENGTH});
  }
    
  render() {
    const {building, aed} = this.props.location.state
    const {type, note} = this.state;
    const newAED = this.props.AEDs.filter(a => a.id === aed.id)[0];
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>AED Inspection Form</h2>
        <h5>Building: {building.name}</h5>
        <h5>Location: {aed.location}</h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Type of Inspection</label>
            <select className="form-control" value={type} name="type" onChange={this.onChange}>
              <option value="monthly">Monthly</option>
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
        <Link to={{ pathname: "/AED", state: {building: building, aed: newAED}}}>
			<Button className={"btn btn--back"}>Back</Button>
		</Link>
  </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    auth: state.auth,
    AEDs: state.AEDs.AEDs,
  });
  
export default connect(mapStateToProps, { createAEDInspection, updateAEDInspectionDate, createAEDNote })(AEDInspection);