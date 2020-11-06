import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBuildings, deleteBuilding } from '../../actions/buildings';
import './buttonStyles.css';
import './format.css';
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
			<h1 className={"buildingNames"}> Buildings
			<div className = "Style grid">
			
			{this.props.buildings.map((building) => (
				<li key={building.id}>
					<Link to={{ pathname: '/Staging', state:{building:building}}}>
						<div className =  "App">
						<button
							className={"btn btn--medium"} 
							type = "button"
							onClick={() => {this.setState(this)}}>
							{building.name}
							</button>
						</div>	
					</Link>
				</li>
            ))}
			</div>
			</h1>
		</Fragment>
	  );
	}
  }
  
  const mapStateToProps = (state) => ({
	buildings: state.buildings.buildings,
  });
  
  export default withRouter(connect(mapStateToProps, { getBuildings, deleteBuilding })(Buildings));
