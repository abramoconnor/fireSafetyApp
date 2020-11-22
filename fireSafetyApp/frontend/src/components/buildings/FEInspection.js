import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createFEInspection, updateFEInspectionDate } from '../../actions/FEs';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

export class FEInspection extends Component {
  state = {
    type: 'monthly',
  }

  static propTypes = {
    createFEInspection: PropTypes.func.isRequired,
    updateFEInspectionDate: PropTypes.func.isRequired
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    let fire_extinguisher = this.props.location.state.fe;
    let inspection = {
      inspection_type: this.state.type,
      date_tested: new Date(),
      tester: "Chancellor O'Connor",
      fire_extinguisher: this.props.location.state.fe.id
    };
    this.props.createFEInspection(inspection);
    this.props.updateFEInspectionDate(fire_extinguisher, inspection)
    this.setState({ type: ''});
  }
    
  render() {
    const {building, fe} = this.props.location.state
    const {type} = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        {/* ???Blane format this thing LOL */}
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
          {/* <div className="form-group">
            <label>Notes</label>
            <input
              className="form-control"
              type="text"
              name="notes"
              onChange={this.onChange}
              value={notes}
            />
          </div> */}
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
  
export default connect(null, { createFEInspection, updateFEInspectionDate })(FEInspection);