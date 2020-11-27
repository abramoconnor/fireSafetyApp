import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createFE } from '../../actions/FEs';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";


export class CreateFEForm extends Component {
  state = {
    exnum: '',
    last_monthly_inspection: '',
    upcoming_monthly_inspection: '',
    last_annual_inspection: '',
    upcoming_annual_inspection: '',
    last_6year_service: '',
    upcoming_6year_service: '',
    last_12year_test: '',
    upcoming_12year_test: '',
  };

  static propTypes = {
    createFE: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const building = this.props.location.state.building.id;
    const { 
      exnum, 
      last_monthly_inspection, 
      upcoming_monthly_inspection, 
      last_annual_inspection, 
      upcoming_annual_inspection, 
      last_6year_service, 
      upcoming_6year_service, 
      last_12year_test, 
      upcoming_12year_test 
    } = this.state;
    let FE = { exnum, building };
    if (last_monthly_inspection) {
      FE.last_monthly_inspection = last_monthly_inspection
    }
    if (upcoming_monthly_inspection) {
      FE.upcoming_monthly_inspection = upcoming_monthly_inspection
    }
    if (last_annual_inspection) {
      FE.last_annual_inspection = last_annual_inspection
    }
    if (upcoming_annual_inspection) {
      FE.upcoming_annual_inspection = upcoming_annual_inspection
    }
    if (last_6year_service) {
      FE.last_6year_service = last_6year_service
    }
    if (upcoming_6year_service) {
      FE.upcoming_6year_service = upcoming_6year_service
    }
    if (last_12year_test) {
      FE.last_12year_test = last_12year_test
    }
    if (upcoming_12year_test) {
      FE.upcoming_12year_test = upcoming_12year_test
    }
    this.props.createFE(FE);
    this.setState({
      exnum: '',
      last_monthly_inspection: '',
      upcoming_monthly_inspection: '',
      last_annual_inspection: '',
      upcoming_annual_inspection: '',
      last_6year_service: '',
      upcoming_6year_service: '',
      last_12year_test: '',
      upcoming_12year_test: '',
    });
  };

  render() {
    const { 
      exnum, 
      last_monthly_inspection, 
      upcoming_monthly_inspection,
      last_annual_inspection, 
      upcoming_annual_inspection,
      last_6year_service, 
      upcoming_6year_service,
      last_12year_test,
      upcoming_12year_test
    } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Create New Fire Extinguisher</h2>
        <p>Fields with an "*" are optional</p>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Extinguisher Number</label>
            <input
              className="form-control"
              type="text"
              name="exnum"
              onChange={this.onChange}
              value={exnum}
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
            <label>*Last 6 Year Service (If blank, auto-populates to today)</label>
            <input
              className="form-control"
              type="datetime-local"
              name="last_6year_service"
              onChange={this.onChange}
              value={last_6year_service}
            />
          </div>
          <div className="form-group">
            <label>*Upcoming 6 Year Service (If blank, auto-populates to 6 years from today)</label>
            <input
              className="form-control"
              type="datetime-local"
              name="upcoming_6year_service"
              onChange={this.onChange}
              value={upcoming_6year_service}
            />
          </div>
          <div className="form-group">
            <label>*Last 12 Year Test (If blank, auto-populates to today)</label>
            <input
              className="form-control"
              type="datetime-local"
              name="last_12year_test"
              onChange={this.onChange}
              value={last_12year_test}
            />
          </div>
          <div className="form-group">
            <label>*Upcoming 12 Year Test (If blank, auto-populates to 12 years from today)</label>
            <input
              className="form-control"
              type="datetime-local"
              name="upcoming_12year_test"
              onChange={this.onChange}
              value={upcoming_12year_test}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn2 btn--submit">
              SUBMIT
            </button>
          </div>
        </form>
          <div>
             <Link to={{ pathname: "/FireExtinguisherList", state: this.props.location.state}}>		
               <Button className={"btn btn--back"}>Back</Button>   
		         </Link>
          </div> 
      </div>
    );
  }
}

export default connect(null, { createFE })(CreateFEForm);
