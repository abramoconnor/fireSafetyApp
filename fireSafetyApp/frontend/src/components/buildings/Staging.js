import React, { Component, Fragment } from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import { connect } from 'react-redux';
import { getBuildings, deleteBuilding } from '../../actions/buildings';

export class Staging extends Component {


	componentDidMount() {
		this.setState();
	  }

    render() {
		const {building} = this.props.history.location.state
        return (
            <Fragment>
                <h1 className={"buildingNames"}>{building.name}'s Assets</h1>
				<li>
					<Link to={{ pathname: '/Fire Extinguisher', state:{building:building}}}>
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
						onClick={() => {
								console.log('click click click');
							}}
							> AED
							</Button>
					</Link>
				</li>
                <li>
					<Link to={{ pathname: '/Fire Extinguisher', state:{building:building}}}>
						<Button 
						className={"btn btn--mediumSmall"}
						onClick={() => {
								console.log('click click click');
							}}
							> Sprinkler
							</Button>
					</Link>
				</li>
                <li>
					<Link to={{ pathname: '/Fire Extinguisher', state:{building:building}}}>
						<Button 
						className={"btn btn--mediumSmall"}
						onClick={() => {
								console.log('click click click');
							}}
							> Alarms
							</Button>
					</Link>
				</li>
          <Link to={{ pathname: '/Home', state:{building:building}}}>
						<Button 
						className={"btn btn--mediumSmall"}
						onClick={() => {
							}}
							> Back
							</Button>
					</Link>
      </Fragment>
    );
}
}

const mapStateToProps = (state) => ({
	buildings: state.buildings.buildings,
  });
  
  export default connect(mapStateToProps, { getBuildings, deleteBuilding })(Staging);