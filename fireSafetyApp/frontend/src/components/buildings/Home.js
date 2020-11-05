import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBuildings, deleteBuilding } from '../../actions/buildings';
import './button.css';
import './App.css';
import { Link, withRouter } from 'react-router-dom';

export class Buildings extends Component {
	static propTypes = {
	  buildings: PropTypes.array.isRequired,
	  getBuildings: PropTypes.func.isRequired,
	  deleteBuilding: PropTypes.func.isRequired,
	};
  
	componentDidMount() {
	  this.props.getBuildings();
	}

	render() {
	  return (
		<Fragment>
			{this.props.buildings.map((building) => (
				<li key={building.id}>
					<Link to={{ pathname: '/Staging', state:{building:building}}}>
						<div className =  "App">
						<button
							className={"btn btn--medium adjustdown"} 
							type = "button"
							onClick={() => {console.log('yh y yt');}}>
							{building.name}
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
	buildings: state.buildings.buildings,
  });
  
  export default withRouter(connect(mapStateToProps, { getBuildings, deleteBuilding })(Buildings));
