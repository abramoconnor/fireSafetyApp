import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads, deleteLead } from '../../actions/leads';
import {Link, useLocation} from "react-router-dom";

export class Staging extends Component {
    render() {
        const {lead} = this.props.location.state
        console.log(lead);
        return (
        <Fragment>
          <h1>{lead.name}</h1>
      </Fragment>
    );
  }
}


export default Staging;
