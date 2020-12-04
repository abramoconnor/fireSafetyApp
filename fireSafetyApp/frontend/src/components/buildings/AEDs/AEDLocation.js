import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link, Redirect} from "react-router-dom";
import {Button} from "react-bootstrap";
import { createMessage } from "../../../actions/messages";
import {updateAEDLocation} from "../../../actions/AEDs";

export class AEDLocation extends Component {
  state = {
    newlocation: '',
    locationChanged: false
  }

  static propTypes = {
    buildings: PropTypes.array.isRequired,
    updateAEDLocation: PropTypes.func.isRequired
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const {aed} = this.props.location.state;
    const {newlocation} = this.state;
    const requestBody = {
        location: newlocation
    };
    this.props.updateAEDLocation(aed, requestBody);
    this.setState({newlocation: '', locationChanged: true});
  }
    
  render() {
    const {building, aed} = this.props.location.state;
    const {newlocation, locationChanged} = this.state;
    if (locationChanged) {
        return <Redirect to={{ pathname: '/AEDList', state: {building: building}}}/>;
    }
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>AED Location Change Form</h2>
        <h5>Current Location: {aed.location}</h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Where do you wish to move this asset?</label>
            <input
              className="form-control"
              type="text"
              name="newlocation"
              onChange={this.onChange}
              value={newlocation}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
                Change
            </button>
          </div>
        </form>
        <Link to={{ pathname: "/AED", state: {building:building, aed: aed}}}>
			<Button className={"btn btn--back"}>Back</Button>
		</Link>
      </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    buildings: state.buildings.buildings
  });
  
export default connect(mapStateToProps, {createMessage, updateAEDLocation})(AEDLocation);