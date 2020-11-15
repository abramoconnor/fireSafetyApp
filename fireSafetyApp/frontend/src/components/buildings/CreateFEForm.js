import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createFE } from '../../actions/FEs';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";


export class CreateFEForm extends Component {
  state = {
    code: '',
  };

  static propTypes = {
    createFE: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { code } = this.state;
    const FE = { code };
    this.props.createFE(FE);
    this.setState({
      code: '',
    });
  };

  render() {
    const { code } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Create New Fire Extinguisher</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Code</label>
            <input
              className="form-control"
              type="text"
              name="code"
              onChange={this.onChange}
              value={code}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <Link to={{ pathname: "/Fire Extinguisher", state: this.props.location.state}}>
			<Button className={"btn btn--back"}>Back</Button>
		</Link>
      </div>
    );
  }
}

export default connect(null, { createFE })(CreateFEForm);
