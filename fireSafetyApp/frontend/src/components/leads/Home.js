import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads, deleteLead } from '../../actions/leads';
import './button.css';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
						<div className =  "App">
						<button
							className={"btn btn--medium adjustdown"} 
							type = "button"
							onClick={() => {console.log('yh y yt');}}>
							{lead.name}
							</button>
						</div>	
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
