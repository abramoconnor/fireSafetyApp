import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBuilding } from '../../actions/buildings';


export class Form extends Component {
  state = {
    name: '',
    code: '',
    date_last_inspected: '',
  };

  static propTypes = {
    addBuilding: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { name, code, date_last_inspected } = this.state;
    const building = { name, code, date_last_inspected };
    //this.props.addBuilding(building);
    this.setState({
      name: '',
      code: '',
      date_last_inspected: '',
    });
  };

  render() {
    const { name, code, date_last_inspected } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add ext</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>foo</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>
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
            <label>date_last_inspected</label>
            <textarea
              className="form-control"
              type="text"
              name="date_last_inspected"
              onChange={this.onChange}
              value={date_last_inspected}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addBuilding })(Form);
