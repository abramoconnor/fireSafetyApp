import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createAED } from '../../../actions/AEDs';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";


export class CreateAEDForm extends Component {
  state = {
    location: '',
    last_monthly_inspection: '',
    upcoming_monthly_inspection: '',
  };

  static propTypes = {
    createAED: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const building = this.props.location.state.building.id;
    const { 
      location, 
      last_monthly_inspection, 
      upcoming_monthly_inspection, 
    } = this.state;
    let AED = { location, building };
    if (last_monthly_inspection) {
      FE.last_monthly_inspection = last_monthly_inspection
    }
    if (upcoming_monthly_inspection) {
      FE.upcoming_monthly_inspection = upcoming_monthly_inspection
    }
    this.props.createAED(AED);
    this.setState({
        location: '',
        last_monthly_inspection: '',
        upcoming_monthly_inspection: '',
    });
  };

  render() {
    const { 
        location, 
        last_monthly_inspection, 
        upcoming_monthly_inspection, 
    } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Create New AED</h2>
        <p>Fields with an "*" are optional</p>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>AED Location (in building)</label>
            <input
              className="form-control"
              type="text"
              name="location"
              onChange={this.onChange}
              value={location}
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
            <button type="submit" className="btn2 btn--submit">
              SUBMIT
            </button>
          </div>
        </form>
          <div>
             <Link to={{ pathname: "/AEDList", state: this.props.location.state}}>		
               <Button className={"btn btn--back"}>Back</Button>   
		         </Link>
          </div> 
      </div>
    );
  }
}

export default connect(null, { createAED })(CreateAEDForm);
