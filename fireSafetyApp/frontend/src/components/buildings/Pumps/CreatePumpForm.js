import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPump } from '../../../actions/Pumps';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";


export class CreatePumpForm extends Component {
  state = {
    last_monthly_inspection: '',
    upcoming_monthly_inspection: '',
    last_annual_inspection: '',
    upcoming_annual_inspection: '',
  };

  static propTypes = {
    createPump: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const building = this.props.location.state.building.id;
    const { 
      last_monthly_inspection, 
      upcoming_monthly_inspection, 
      last_annual_inspection, 
      upcoming_annual_inspection, 
    } = this.state;
    let fire_pump = { building };
    if (last_monthly_inspection) {
      fire_pump.last_monthly_inspection = last_monthly_inspection
    }
    if (upcoming_monthly_inspection) {
      fire_pump.upcoming_monthly_inspection = upcoming_monthly_inspection
    }
    if (last_annual_inspection) {
      fire_pump.last_annual_inspection = last_annual_inspection
    }
    if (upcoming_annual_inspection) {
      fire_pump.upcoming_annual_inspection = upcoming_annual_inspection
    }
    this.props.createPump(fire_pump);
    this.setState({
      last_monthly_inspection: '',
      upcoming_monthly_inspection: '',
      last_annual_inspection: '',
      upcoming_annual_inspection: '',
    });
  };

  render() {
    const {building} = this.props.location.state;
    const { 
      last_monthly_inspection, 
      upcoming_monthly_inspection,
      last_annual_inspection, 
      upcoming_annual_inspection,
    } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Create New Fire Pump for {building.name}</h2>
        <p>Fields with an "*" are optional</p>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>*Last Monthly Inspection (If blank, auto-populates to today)</label>
            <input
              className="form-control"
              type="datetime-local"
              name="last_monthly_inspection"
              onChange={this.onChange}
              value={last_monthly_inspection}
            />
          </div>
          <div className="form-group">
            <label>*Upcoming Monthly Inspection (If blank, auto-populates to a month from today)</label>
            <input
              className="form-control"
              type="datetime-local"
              name="upcoming_monthly_inspection"
              onChange={this.onChange}
              value={upcoming_monthly_inspection}
            />
          </div>
          <div className="form-group">
            <label>*Last Annual Inspection (If blank, auto-populates to today)</label>
            <input
              className="form-control"
              type="datetime-local"
              name="last_annual_inspection"
              onChange={this.onChange}
              value={last_annual_inspection}
            />
          </div>
          <div className="form-group">
            <label>*Upcoming Annual Inspection (If blank, auto-populates to a year from today)</label>
            <input
              className="form-control"
              type="datetime-local"
              name="upcoming_annual_inspection"
              onChange={this.onChange}
              value={upcoming_annual_inspection}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn2 btn--submit">
              SUBMIT
            </button>
          </div>
        </form>
          <div>
             <Link to={{ pathname: "/Assets", state: this.props.location.state}}>		
               <Button className={"btn btn--back"}>Back</Button>   
		         </Link>
          </div> 
      </div>
    );
  }
}

export default connect(null, { createPump })(CreatePumpForm);
