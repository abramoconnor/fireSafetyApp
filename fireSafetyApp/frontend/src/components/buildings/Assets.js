import React, { Component, Fragment } from 'react';
import {Link, Redirect} from "react-router-dom";
import {Button} from "react-bootstrap";
import { connect } from 'react-redux';
import { getBuildings, deleteBuilding } from '../../actions/buildings';
import { getASByBuilding, deleteAlarmSystem } from '../../actions/Alarms';
import { getPumpByBuilding, deletePump } from '../../actions/Pumps';
import PropTypes from 'prop-types';

//asset landing page. Reguardless of which asset type you pick you'll end up here. Keep that in mind when desiging changes.

export class Assets extends Component {
	state = {
		isDeleted: false,
		createAlarmClass: 'btn btn--small',
		deleteAlarmClass: 'hide',
		createPumpClass: 'btn btn--small',
		deletePumpClass: 'hide',
		fireAlarmSysButtonClass: 'hide',
		pumpButtonClass: 'hide'
	};

	static propTypes = {
		AlarmSystems: PropTypes.array.isRequired,
		Pumps: PropTypes.array.isRequired,
		deleteBuilding: PropTypes.func.isRequired,
		getASByBuilding: PropTypes.func.isRequired,
		deleteAlarmSystem: PropTypes.func.isRequired,
		getPumpByBuilding: PropTypes.func.isRequired,
		deletePump: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.props.getASByBuilding(this.props.location.state.building.id);
		this.props.getPumpByBuilding(this.props.location.state.building.id);
		if (!this.props.AlarmSystems[0]) {
			this.setState({createAlarmClass: 'btn btn--small', deleteAlarmClass: 'hide', fireAlarmSysButtonClass: 'hide'});
		}
		if (!this.props.Pumps[0]) {
			this.setState({createPumpClass: 'btn btn--small', deletePumpClass: 'hide', pumpButtonClass: 'hide' });
		}
	}

	deleteBuilding = (b) => {
		this.props.deleteBuilding(b);
		this.setState({isDeleted: true });
	}

	deleteAlarmSys = (id) => {
		this.props.deleteAlarmSystem(id);
		this.setState({createAlarmClass: 'btn btn--small', deleteAlarmClass: 'hide', fireAlarmSysButtonClass: 'hide'})
	};

	deletePump = (id) => {
		this.props.deletePump(id);
		this.setState({createPumpClass: 'btn btn--small', deletePumpClass: 'hide', pumpButtonClass: 'hide'});
	};

    render() {
		let {
			 isDeleted,
			 createAlarmClass,
			 deleteAlarmClass,
			 fireAlarmSysButtonClass,
			 createPumpClass,
			 deletePumpClass,
			 pumpButtonClass
			} = this.state;
		const {building} = this.props.history.location.state;
		if(isDeleted) {
			return <Redirect to={{ pathname: '/Home', state:{building:building}}}/>
		}
		if (this.props.AlarmSystems[0]) {
			createAlarmClass = 'hide';
			deleteAlarmClass = 'btn btn--small';
			fireAlarmSysButtonClass = 'btn btn--mediumSmall';
		}
		if (this.props.Pumps[0]) {
			createPumpClass = 'hide';
			deletePumpClass = 'btn btn--small';
			pumpButtonClass = 'btn btn--mediumSmall';
		}
        return (
            <Fragment>
                <h1 className={"buildingNames"}>{building.name}'s Assets</h1>
				


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
					<Link to={{ pathname: '/AEDList', state:{building:building}}}>
						<Button 
						className={"btn btn--mediumSmall"}
						onClick={() => {}}
							> AED's
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
				<li>
					<Link to={{ pathname: '/FirePump', state:{building:building, pump: this.props.Pumps[0]}}}>
						<Button 
						className={pumpButtonClass}
						onClick={() => {}}
							> Fire Pump
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

			<div className = "grid">	
				<Link to={{ pathname: '/CreateASForm', state: {building: building}}}>
					<Button className={createAlarmClass} onClick={()=>{}}>
						Create Fire Alarm System
					</Button>
				</Link>
				
				<Button className={deleteAlarmClass} onClick={()=>{
					if(window.confirm('Are you sure you want to DELETE this asset? If you do, all inspections and notes related to it will be gone.')) {
						this.deleteAlarmSys(this.props.AlarmSystems[0].id);
					}}}>
					Delete Current Fire Alarm System
				</Button>

				<Link to={{ pathname: '/CreatePumpForm', state: {building: building}}}>
					<Button className={createPumpClass} onClick={()=>{}}>
						Create Fire Pump
					</Button>
				</Link>

				<Button className={deletePumpClass} onClick={()=>{
					if(window.confirm('Are you sure you want to DELETE this asset? If you do, all inspections and notes related to it will be gone.')) {
						this.deletePump(this.props.Pumps[0].id);
					}}}>
					Delete Current Fire Pump
				</Button>

				<Button className={"btn btn--small"} onClick={() => {
					if(window.confirm('Are you sure you want to DELETE this building? If you do, all assets, inspections and notes related to it will be gone.')) {
						this.deleteBuilding(building);
					}}}>
					Delete Building
				</Button>

				</div>					
			
      </Fragment>
    );
}
}

const mapStateToProps = (state) => ({
	buildings: state.buildings.buildings,
	AlarmSystems: state.ALARMs.AlarmSystems,
	Pumps: state.Pumps.Pumps
});
  
  export default connect(mapStateToProps, { getBuildings, deleteBuilding, getASByBuilding, deleteAlarmSystem, getPumpByBuilding, deletePump })(Assets);