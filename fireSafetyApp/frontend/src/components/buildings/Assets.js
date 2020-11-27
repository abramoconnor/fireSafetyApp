import React, { Component, Fragment } from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import { connect } from 'react-redux';
import { getBuildings, deleteBuilding } from '../../actions/buildings';

export class Assets extends Component {


	componentDidMount() {
		this.setState();
	  }

    render() {
		const {building} = this.props.history.location.state
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