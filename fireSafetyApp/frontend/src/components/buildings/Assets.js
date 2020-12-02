import React, { Component, Fragment } from 'react';
import {Link, Redirect} from "react-router-dom";
import {Button} from "react-bootstrap";
import { connect } from 'react-redux';
import { getBuildings, deleteBuilding } from '../../actions/buildings';
import { getASByBuilding, deleteAlarmSystem } from '../../actions/Alarms';
import PropTypes from 'prop-types';

export class Assets extends Component {
	state = {
		isDeleted: false,
		createButtonClass: 'btn btn--small',
		deleteButtonClass: 'hide',
		fireAlarmSysButtonClass: 'hide'
	};

	static propTypes = {
		AlarmSystems: PropTypes.array.isRequired,
		deleteBuilding: PropTypes.func.isRequired,
		getASByBuilding: PropTypes.func.isRequired,
		deleteAlarmSystem: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.props.getASByBuilding(this.props.location.state.building.id);
		if (!this.props.AlarmSystems[0]) {
			this.setState({createButtonClass: 'btn btn--small', deleteButtonClass: 'hide', fireAlarmSysButtonClass: 'hide'});
		}
	}

	deleteBuilding = (id) => {
		this.props.deleteBuilding(id);
		this.setState({isDeleted: true });
	}

	deleteAlarmSys = (id) => {
		this.props.deleteAlarmSystem(id);
		this.setState({createButtonClass: 'btn btn--small', deleteButtonClass: 'hide', fireAlarmSysButtonClass: 'hide'})
	};

    render() {
		let {isDeleted, createButtonClass, deleteButtonClass, fireAlarmSysButtonClass} = this.state;
		const {building} = this.props.history.location.state;
		if(isDeleted) {
			return <Redirect to={{ pathname: '/Home', state:{building:building}}}/>
		}
		if (this.props.AlarmSystems[0]) {
			createButtonClass = 'hide';
			deleteButtonClass = 'btn btn--small';
			fireAlarmSysButtonClass = 'btn btn--mediumSmall';
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
				<Link to={{ pathname: '/CreateASForm', state: {building: building}}}>
					<Button className={createButtonClass} onClick={()=>{}}>
						Create Fire Alarm System
					</Button>
				</Link>
				
				<Button className={deleteButtonClass} onClick={()=>{
					if(window.confirm('Are you sure you want to DELETE this building? If you do, all assets, inspections and notes related to it will be gone.')) {
						this.deleteAlarmSys(this.props.AlarmSystems[0].id);
					}}}>
					Delete Current Fire Alarm System
				</Button>
				<div className = "grid">
				<li>
					<Link to={{ pathname: '/FireExtinguisherList', state:{building:building}}}>
						<Button 
						className={"btn btn--mediumSmall"}
						onClick={() => {
							}}
							> Fire Extinguishers
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
					<Link to={{ pathname: '/SprinklerSystemList', state:{building:building}}}>
						<Button 
						className={"btn btn--mediumSmall"}
						onClick={() => {}}
							> Sprinkler Systems
							</Button>
					</Link>
				</li>
                <li>
					<Link to={{ pathname: '/AlarmSystem', state:{building:building, AlarmSystem: this.props.AlarmSystems[0]}}}>
						<Button 
						className={fireAlarmSysButtonClass}
						onClick={() => {}}
							> Fire Alarm System
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
	AlarmSystems: state.ALARMs.AlarmSystems
});
  
  export default connect(mapStateToProps, { getBuildings, deleteBuilding, getASByBuilding, deleteAlarmSystem })(Assets);