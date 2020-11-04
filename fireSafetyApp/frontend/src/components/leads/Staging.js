import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads, deleteLead } from '../../actions/leads';
import {Link, useLocation} from "react-router-dom";
import {Card, Button} from "react-bootstrap";

export class Staging extends Component {

    render() {
        const {lead} = this.props.location.state
        console.log(lead);
        return (
            <Fragment>
                <h1>{lead.name}</h1>
				<li>
					<Link to={{ pathname: '/Fire Extinguisher', state:{lead:lead}}}>
						<Button onClick={() => {
								console.log('click click click');
							}}
							> Fire Extinguisher
							</Button>
					</Link>
				</li>
                <li>
					<Link to={{ pathname: '/Fire Extinguisher', state:{lead:lead}}}>
						<Button onClick={() => {
								console.log('click click click');
							}}
							> AED
							</Button>
					</Link>
				</li>
                <li>
					<Link to={{ pathname: '/Fire Extinguisher', state:{lead:lead}}}>
						<Button onClick={() => {
								console.log('click click click');
							}}
							> Sprinkler
							</Button>
					</Link>
				</li>
                <li>
					<Link to={{ pathname: '/Fire Extinguisher', state:{lead:lead}}}>
						<Button onClick={() => {
								console.log('click click click');
							}}
							> Alarms
							</Button>
					</Link>
				</li>
      </Fragment>
    );
}
}

export default Staging;
