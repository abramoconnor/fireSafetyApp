import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFEs, deleteFEs } from '../../actions/FEs';
import {Card, Button} from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export class Fire_Extinguisher extends Component {

    static propTypes = {
        FEs: PropTypes.array.isRequired,
        getFEs: PropTypes.func.isRequired,
        deleteFEs: PropTypes.func.isRequired,
      };
    
      componentDidMount() {
        this.props.getFEs();
      }

	render() {
        const {lead} = this.props.location.state
	  return (
		<Fragment>
			  <h2>Fire Extinguishers for {lead.name}</h2>
              
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Last Inspected</th>
              <th>Upcomming inspection</th>
            </tr>
          </thead>
          <tbody>
            {this.props.FEs.map((FE) => (
              <tr key={FE.id}>
                <td>{FE.id}</td>
                <td>{FE.code}</td>
                <td>{FE.last_inspection}</td>
                <td>{FE.upcoming_inspection}</td>
                <td>
                  <button
                    onClick={this.props.deleteFEs.bind(this, FE.id)}
                    className="btn btn-danger btn-sm"
                  >
                    {' '}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
		</Fragment>
	  );
	}
  }
  
  const mapStateToProps = (state) => ({
    FEs: state.FEs.FEs,
  });
  
  export default connect(mapStateToProps, { getFEs, deleteFEs })(Fire_Extinguisher);