import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link, Redirect} from "react-router-dom";
import {Button} from "react-bootstrap";
import {updateFELocation} from "../../../actions/FEs";

export class FETransfer extends Component {
  state = {
    newbuildingId: '',
    isTransferred: false
  }

  static propTypes = {
    buildings: PropTypes.array.isRequired,
    updateFELocation: PropTypes.func.isRequired
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const {newbuildingId} = this.state;
    if (!newbuildingId) {} 
    else {
        const {fe} = this.props.location.state;
        const newbuilding = this.props.buildings.filter(b => b.id == newbuildingId);
        const requestBody = {
            building: newbuildingId
        };
        this.props.updateFELocation(fe, requestBody, newbuilding);
        this.setState({newbuildingId: '', isTransferred: true});
    }
  }

  listBuildings = (b) => {
    if (b.id === this.props.location.state.building.id) {
        return;
    } else {
        return <option key={b.id} value={b.id}>{b.name}</option>
    }
  }
    
  render() {
    const {building, fe} = this.props.location.state;
    const {newbuildingId, isTransferred} = this.state;
    if (isTransferred) {
        return <Redirect to="/" />;
    }
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Fire Extinguisher Transfer Form</h2>
        <h5>Extinguisher: {fe.exnum}</h5>
        <h5>Current Location: {building.name}</h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Where do you wish to transfer the asset?</label>
            <select className="form-control" value={newbuildingId} name="newbuildingId" onChange={this.onChange}>
              <option key='default' value=''>---Choose a Location---</option>
              {this.props.buildings.map(b => 
                this.listBuildings(b)
              )}
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
                Transfer
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
    buildings: state.buildings.buildings
  });
  
export default connect(mapStateToProps, {updateFELocation})(FETransfer);