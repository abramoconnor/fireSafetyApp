import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBuildings, deleteBuilding } from '../../actions/buildings';
import '../../styles/buttonStyles.css';
import '../../styles/format.css';
import { Link, withRouter } from 'react-router-dom';
import SearchField from "react-search-field"

export class Buildings extends Component {
	static propTypes = {
	  buildings: PropTypes.array.isRequired,
	  getBuildings: PropTypes.func.isRequired,
	  deleteBuilding: PropTypes.func.isRequired,
	};


	state = {search:null};

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

	setSearchKey = (key) =>
	{
		this.setState({search:key})
	}
	
	componentDidMount() {
		this.props.getBuildings();
		this.props.history.push()
	}
	
	render() {
		return (
			<Fragment>	
					<SearchField placeholder="Search..." type = "text" onChange={(e)=>this.setSearchKey(e)}/>
					<h1 className={"buildingNames style"}> Buildings</h1>
				
				<div className = "grid">
					{this.props.buildings.map(building => this.filter(building))}
				</div>
				<div className = "grid">
				<Link to={{ pathname: '/CreateBuildingForm', state:{}}}>
            		<button className={"btn2 btn--mediumSmall"} type="button" onClick={() => {console.log("addnew building")}}>Add New Building</button>   
          		</Link>
				</div>
			</Fragment>
	  );
	}
  }

  /* failed searchbar code

  	<div class='search-bar'>
						<input type='text' className='search-bar__input' placeholder="Search...">
						</input>
						<button className='search-bar__submit'>Go</button>
	</div>

  */
  
  const mapStateToProps = (state) => ({
	buildings: state.buildings.buildings,
  });
  
  export default withRouter(connect(mapStateToProps, { getBuildings, deleteBuilding })(Buildings));
