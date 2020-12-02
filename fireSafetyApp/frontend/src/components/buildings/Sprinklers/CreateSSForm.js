import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createSprinklerSystem } from '../../../actions/Sprinklers';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";


export class CreateSSForm extends Component {
  state = {
    system_type: 'Wet',
    last_weekly_inspection: '',
    upcoming_weekly_inspection: '',
    last_monthly_inspection: '',
    upcoming_monthly_inspection: '',
    last_quarterly_inspection: '',
    upcoming_quarterly_inspection: '',
    last_semiannual_inspection: '',
    upcoming_semiannual_inspection: '',
    last_annual_inspection: '',
    upcoming_annual_inspection: '',
  };

  static propTypes = {
    createSprinklerSystem: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const building = this.props.location.state.building.id;
    const { 
      system_type,
      last_weekly_inspection,
      upcoming_weekly_inspection,
      last_monthly_inspection,
      upcoming_monthly_inspection,
      last_quarterly_inspection,
      upcoming_quarterly_inspection,
      last_semiannual_inspection,
      upcoming_semiannual_inspection,
      last_annual_inspection,
      upcoming_annual_inspection,
    } = this.state;
    let ss = { system_type, building };
    if (last_weekly_inspection) {
      ss.last_weekly_inspection = last_weekly_inspection
    }
    if (upcoming_weekly_inspection) {
      ss.upcoming_weekly_inspection = upcoming_weekly_inspection
    }
    if (last_monthly_inspection) {
      ss.last_monthly_inspection = last_monthly_inspection
    }
    if (upcoming_monthly_inspection) {
      ss.upcoming_monthly_inspection = upcoming_monthly_inspection
    }
    if (last_quarterly_inspection) {
      ss.last_quarterly_inspection = last_quarterly_inspection
    }
    if (upcoming_quarterly_inspection) {
      ss.upcoming_quarterly_inspection = upcoming_quarterly_inspection
    }
    if (last_semiannual_inspection) {
      ss.last_semiannual_inspection = last_semiannual_inspection
    }
    if (upcoming_semiannual_inspection) {
      ss.upcoming_semiannual_inspection = upcoming_semiannual_inspection
    }
    if (last_annual_inspection) {
      ss.last_annual_inspection = last_annual_inspection
    }
    if (upcoming_annual_inspection) {
      ss.upcoming_annual_inspection = upcoming_annual_inspection
    }
    this.props.createSprinklerSystem(ss);
    this.setState({
      system_type: 'Wet',
      last_weekly_inspection: '',
      upcoming_weekly_inspection: '',
      last_monthly_inspection: '',
      upcoming_monthly_inspection: '',
      last_quarterly_inspection: '',
      upcoming_quarterly_inspection: '',
      last_semiannual_inspection: '',
      upcoming_semiannual_inspection: '',
      last_annual_inspection: '',
      upcoming_annual_inspection: '',
    });
  };

  render() {
    const { 
        system_type,
        last_weekly_inspection,
        upcoming_weekly_inspection,
        last_monthly_inspection,
        upcoming_monthly_inspection,
        last_quarterly_inspection,
        upcoming_quarterly_inspection,
        last_semiannual_inspection,
        upcoming_semiannual_inspection,
        last_annual_inspection,
        upcoming_annual_inspection,
    } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Create New Sprinkler System</h2>
        <p>Fields with an "*" are optional</p>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>System Type</label>
            <select className="form-control" value={system_type} name="system_type" onChange={this.onChange}>
              <option value="Wet">Wet</option>
              <option value="Dry">Dry</option>
              <option value="Pre-Action">Pre-Action</option>
            </select>
          </div>
          <div className="form-group">
            <label>*Last Weekly Inspection (If blank, auto-populates to today)</label>
            <input
              className="form-control"
              type="datetime-local"
              name="last_weekly_inspection"
              onChange={this.onChange}
              value={last_weekly_inspection}
            />
          </div>
          <div className="form-group">
            <label>*Upcoming Weekly Inspection (If blank, auto-populates to a week from today)</label>
            <input
              className="form-control"
              type="datetime-local"
              name="upcoming_weekly_inspection"
              onChange={this.onChange}
              value={upcoming_weekly_inspection}
            />
          </div>
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
            <label>*Last Quarterly Inspection (If blank, auto-populates to today)</label>
            <input
              className="form-control"
              type="datetime-local"
              name="last_quarterly_inspection"
              onChange={this.onChange}
              value={last_quarterly_inspection}
            />
          </div>
          <div className="form-group">
            <label>*Upcoming Quarterly Inspection (If blank, auto-populates to a 3 months from today)</label>
            <input
              className="form-control"
              type="datetime-local"
              name="upcoming_quarterly_inspection"
              onChange={this.onChange}
              value={upcoming_quarterly_inspection}
            />
          </div>
          <div className="form-group">
            <label>*Last Semi-Annual Inspection (If blank, auto-populates to today)</label>
            <input
              className="form-control"
              type="datetime-local"
              name="last_semiannual_inspection"
              onChange={this.onChange}
              value={last_semiannual_inspection}
            />
          </div>
          <div className="form-group">
            <label>*Upcoming Semi-Annual Inspection (If blank, auto-populates to a year from today)</label>
            <input
              className="form-control"
              type="datetime-local"
              name="upcoming_semiannual_inspection"
              onChange={this.onChange}
              value={upcoming_semiannual_inspection}
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
             <Link to={{ pathname: "/SprinklerSystemList", state: this.props.location.state}}>		
               <Button className={"btn btn--back"}>Back</Button>   
		         </Link>
          </div> 
      </div>
    );
  }
}

export default connect(null, { createSprinklerSystem })(CreateSSForm);
