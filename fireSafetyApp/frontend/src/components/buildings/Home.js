import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBuildings, deleteBuilding } from '../../actions/buildings';
import '../../styles/buttonStyles.css';
import '../../styles/format.css';
import { Link, withRouter } from 'react-router-dom';


export class Buildings extends Component {
	static propTypes = {
	  buildings: PropTypes.array.isRequired,
	  getBuildings: PropTypes.func.isRequired,
	  deleteBuilding: PropTypes.func.isRequired,
	};


	state = {search:null};

	//This uses a state object to check if a searched letter (or string of letters) are in the buildings name then only returns the buttons that are
	filter = (building) => {
		if (this.state.search == null)
		{
			return(
			<li key={building.id}>
				<Link to={{ pathname: '/Assets', state:{building:building}}}>
					<div className =  "App">
					<button
						className={"btn btn--medium"} 
						onClick={() => {this.setState(this)}}>
						{building.name}
						</button>
					</div>	
				</Link>
			</li>
			)
		}
		
		else if(building.name.toLowerCase().includes(this.state.search.toLowerCase()))
		{
			return(
			<li key={building.id}>
				<Link to={{ pathname: '/Assets', state:{building:building}}}>
					<div className =  "App">
					<button
						className={"btn btn--medium"} 
						onClick={() => {this.setState(this)}}>
						{building.name}
						</button>
					</div>	
				</Link>
			</li>
			)
		}
	}
//state object for searching
	setSearchKey = (e) =>
	{
		this.setState({search:e.target.value})
	}
	
	componentDidMount() {
		this.props.getBuildings();
	}
	
	render() {
		return (
			<Fragment>	
					<div className="wrapper right">
						<div className= "container">
							<input type="text" className="input" placeholder="Search..." onChange={(e)=>this.setSearchKey(e)}></input>											
						</div>
					</div>

					<h1 className={"buildingNames style"}> Buildings</h1>
				
				<div className = "grid">
					{this.props.buildings.map(building => this.filter(building))}
				</div>
				<div className = "grid">
				<Link to={{ pathname: '/CreateBuildingForm', state:{}}}>
            		<button className={"btn2 btn--mediumSmall"} type="button">Add New Building</button>   
          		</Link>
				</div>
			</Fragment>
	  );
	}
  }

  const mapStateToProps = (state) => ({
	buildings: state.buildings.buildings,
  });
  
  export default withRouter(connect(mapStateToProps, { getBuildings, deleteBuilding })(Buildings));
