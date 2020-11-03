import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads, deleteLead } from '../../actions/leads';
import {Card, Button} from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Staging from "./Staging"

export class Leads extends Component {
	static propTypes = {
	  leads: PropTypes.array.isRequired,
	  getLeads: PropTypes.func.isRequired,
	  deleteLead: PropTypes.func.isRequired,
	};
  
	componentDidMount() {
	  this.props.getLeads();
	}

	render() {
	  return (
		<Fragment>
			{this.props.leads.map((lead) => (
				<li key={lead.id}>
					<Link to={{ pathname: '/Staging', state:{lead:lead}}}>
						<Button onClick={() => {
								console.log('click click click');
							}}
							>{lead.name}
							</Button>
					</Link>
				</li>
            ))}
		</Fragment>
	  );
	}
  }
  
  const mapStateToProps = (state) => ({
	leads: state.leads.leads,
  });
  
  export default connect(mapStateToProps, { getLeads, deleteLead })(Leads);
