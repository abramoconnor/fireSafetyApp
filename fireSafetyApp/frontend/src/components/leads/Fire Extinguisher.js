import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads, deleteLead } from '../../actions/leads';
import {Card, Button} from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export class Fire_Extinguisher extends Component {

	render() {
        const {lead} = this.props.location.state
	  return (
		<Fragment>
			  <h2>Fire Extinguishers for {lead.name}</h2>
              
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Last Inspected</th>
              {/* <th>Upcomming Inspection</th>
              <th>Third party inspections</th>
              <th>Inspect?</th> */}
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.code}</td>
                <td>{lead.last_inspection}</td>
                <td>
                  <button
                    onClick={this.props.deleteLead.bind(this, lead.id)}
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
  
export default Fire_Extinguisher;
