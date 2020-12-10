import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createBuilding } from '../../actions/buildings';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";


export class CreateBuildingForm extends Component {
  state = {
    name: '',
  };

  static propTypes = {
    createBuilding: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const building = { name };
    this.props.createBuilding(building);
    this.setState({
        name: '',
    });
  };

  render() {
    const { name } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Create New Building</h2>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn2 btn--submit">
              SUBMIT
            </button>
          </div>
        </form>
        <div>
        <Link to={{ pathname: "/", state: this.props.location.state}}>
			    <Button className={"btn btn--back"}>Back</Button>
		    </Link>
      </div>
      </div>
    );
  }
}

export default connect(null, { createBuilding })(CreateBuildingForm);
