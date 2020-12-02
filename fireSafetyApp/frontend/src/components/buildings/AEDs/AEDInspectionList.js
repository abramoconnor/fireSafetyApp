import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAEDsByBuilding } from '../../../actions/AEDs';
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";
import SearchField from "react-search-field"

export class AEDInspectionList extends Component {

  static propTypes = {
    AEDs: PropTypes.array.isRequired,
    getAEDsByBuilding: PropTypes.func.isRequired,
  };

  state = {
    search: null
  };

  filter = (AED ,building) => {
		if (this.state.search == null)
		{
			return(
        <tr key={AED.id}>
        {/* ???Blane make this button blue text and underline, no box */}
        <td>
          <Link to={{ pathname: '/FireExtinguisher', state:{building:building, AED: AED}}}>
            <button>
            {AED.exnum}
            </button>
          </Link>
        </td>
        {this.nextInspection(AED)}
      </tr>
			)
		}
		
		else if(AED.exnum.toLowerCase().includes(this.state.search.toLowerCase()))
		{
			return(
        <tr key={AED.id}>
        {/* ???Blane make this button blue text and underline, no box */}
        <td>
          <Link to={{ pathname: '/FireExtinguisher', state:{building:building, AED: AED}}}>
            <button>
            {AED.exnum}
            </button>
          </Link>
        </td>
        {this.nextInspection(AED)}
      </tr>
			)
    }
  }
	

	setSearchKey = (key) => {
		this.setState({search:key})
	}

  componentDidMount() {
    this.props.getAEDsByBuilding(this.props.location.state.building.id);
  }

  // function calculates the inspection closest to the current date
  nextInspection = (AED) => {
    let next = AED.upcoming_monthly_inspection;
    let type = "(Monthly Inspection)";
    if (AED.upcoming_annual_inspection < next ) {
      next = AED.upcoming_annual_inspection;
      type = "(Annual Inspection)";
    } else if (AED.upcoming_6year_service < next) {
      next = AED.upcoming_6year_service;
      type = "(6 Year Service)";
    } else if (AED.upcoming_12year_test < next) {
      next = AED.upcoming_12year_test;
      type = "(12 Year Test)";
    }
    // dates are in UTC so creating date object (nd = newDate) from date string (next) and displaying it in local time
    const nd = new Date(next);
    return (
      <td>{nd.toLocaleDateString().split("T")[0]} {type}</td>
    )
  }
  
  render() {
    const {building} = this.props.location.state;
    return (
      <Fragment>
        <SearchField placeholder="Search..." type = "text" onChange={(e)=>this.setSearchKey(e)}/>
          <h2>Fire Extinguishers for {building.name}</h2>
          <p>Number of Extinguishers in {building.name}: {this.props.AEDs.length}</p>
          {/* ???button on same line */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Extinguisher Number</th>
                <th>Next Upcoming Inspection</th>
              </tr>
            </thead>
            <tbody>
              {this.props.AEDs.map((AED) => (
               this.filter(AED, building)
              ))}
            </tbody>
          </table>
          <div className = "grid">
          <Link to={{ pathname: '/CreateAEDForm', state:{building:building}}}>
            <button className={"btn2 btn--back"} type="button" onClick={() => {}}>Add New Extinguisher</button>   
          </Link>
          <Link to={{ pathname: '/Assets', state:{building:building}}}>
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
    AEDs: state.AEDs.AEDs,
  });
  
  export default withRouter(connect(mapStateToProps, { getAEDsByBuilding })(AEDInspectionList));
