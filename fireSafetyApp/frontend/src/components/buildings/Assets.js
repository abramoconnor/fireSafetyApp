import React, { Component, Fragment } from 'react';
import {Link, Redirect} from "react-router-dom";
import {Button} from "react-bootstrap";
import { connect } from 'react-redux';
import { getBuildings, deleteBuilding } from '../../actions/buildings';
import PropTypes from 'prop-types';

export class Assets extends Component {
	state = {
		isDeleted: false,
	};

	static propTypes = {
		deleteBuilding: PropTypes.func.isRequired,
	};

	deleteBuilding = (id) => {
		this.props.deleteBuilding(id);
		this.setState({isDeleted: true})
	}

    render() {
		const {isDeleted} = this.state;
		const {building} = this.props.history.location.state
		console.log(isDeleted)
		if(isDeleted) {
			return <Redirect to={{ pathname: '/Home', state:{building:building}}}/>
		}
        return (
            <Fragment>
				
                <h1 className={"buildingNames"}>{building.name}'s Assets</h1>
				<Button className={"btn btn--small"} onClick={() => {
					if(window.confirm('Are you sure you want to DELETE this building? If you do, all assets, inspections and notes related to it will be gone.')) {
						this.deleteBuilding(building.id);
					}}}>
					Delete Building
				</Button>
				<div className = "grid">
				<li>
					<Link to={{ pathname: '/FireExtinguisherList', state:{building:building}}}>
						<Button 
						className={"btn btn--mediumSmall"}
						onClick={() => {
							}}
							> Fire Extinguisher
							</Button>
					</Link>
				</li>
                <li>
					<Link to={{ pathname: '/AED', state:{building:building}}}>
						<Button 
						className={"btn btn--mediumSmall"}
						onClick={() => {}}
							> AED
							</Button>
					</Link>
				</li>
                <li>
					<Link to={{ pathname: '/Sprinkler', state:{building:building}}}>
						<Button 
						className={"btn btn--mediumSmall"}
						onClick={() => {}}
							> Sprinkler
							</Button>
					</Link>
				</li>
                <li>
					<Link to={{ pathname: '/Alarm', state:{building:building}}}>
						<Button 
						className={"btn btn--mediumSmall"}
						onClick={() => {}}
							> Alarms
							</Button>
					</Link>
				</li>  
			</div>
			<div className = "grid">
			<Link to={{ pathname: '/Home', state:{building:building}}}>
						<Button 
						className={"btn btn--back"}
						onClick={() => {
							}}
							> Back
							</Button>
					</Link>
			</div>
      </Fragment>
    );
}
}

const mapStateToProps = (state) => ({
	buildings: state.buildings.buildings,
});
  
  export default connect(mapStateToProps, { getBuildings, deleteBuilding })(Assets);