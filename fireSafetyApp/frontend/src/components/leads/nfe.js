import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads, deleteLead } from '../../actions/leads';

export class Nfe extends Component {

  render() {
    return (
      <Fragment>
        <h2>Leads</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>duck</th>
              <th>Message</th>
              <th />
            </tr>
          </thead>
        </table>
      </Fragment>
    );
  }
}

export default Nfe;