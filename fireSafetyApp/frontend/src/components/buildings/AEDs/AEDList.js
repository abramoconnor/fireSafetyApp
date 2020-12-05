import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAEDsByBuilding } from '../../../actions/AEDs';
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";
import SearchField from "react-search-field"

export class AEDList extends Component {
  state = {
    search: null,
    sortConfig: {
      field: 'location',
      direction: 'ascending'
    },
  };

  static propTypes = {
    AEDs: PropTypes.array.isRequired,
    getAEDsByBuilding: PropTypes.func.isRequired,
  };

  // if user clicked field a second time, they want to change the direction of sort
  // default is ascending
  requestSort = (field) => {
    const {sortConfig} = this.state;
    if (sortConfig.field === field && sortConfig.direction === 'ascending') {
      this.setState({sortConfig: {field: field, direction: 'descending'}});
    } else {
      this.setState({sortConfig: {field: field, direction: 'ascending'}});
    }
  }

  sortRows = (building) => {
    let sortedAEDs = [...this.props.AEDs];
    const {sortConfig} = this.state;
    if (sortConfig.field) {
      sortedAEDs.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        } else if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        } else {
          return 0;
        }
      })
    }
    return (
      <tbody>
        {sortedAEDs.map(aed => this.filter(aed, building))}
      </tbody>
    )
  }

  filter = (aed ,building) => {
		if (this.state.search == null)
		{
			return(
        <tr key={aed.id}>
        {/* ???Blane make this button blue text and underline, no box */}
        <td>
          <Link to={{ pathname: '/AED', state:{building:building, aed: aed}}}>
            <button>
              {aed.location}
            </button>
          </Link>
        </td>
        {this.nextInspection(aed)}
      </tr>
			)
		}
		
		else if(aed.location.toLowerCase().includes(this.state.search.toLowerCase()))
		{
			return(
        <tr key={aed.id}>
        {/* ???Blane make this button blue text and underline, no box */}
        <td>
          <Link to={{ pathname: '/AED', state:{building:building, aed: aed}}}>
            <button>
              {aed.location}
            </button>
          </Link>
        </td>
        {this.nextInspection(aed)}
      </tr>
			)
    }
  }
  
  // function calculates the inspection closest to the current date
  // AEDs only have monthly
  nextInspection = (aed) => {
    let next = aed.upcoming_monthly_inspection;
    let type = "(Monthly Inspection)";
    // dates are in UTC so creating date object (nd = newDate) from date string (next) and displaying it in local time
    const nd = new Date(next);
    return (
      <td>{nd.toLocaleDateString().split("T")[0]} {type}</td>
    )
  }

	setSearchKey = (key) => {
		this.setState({search:key});
  }

  componentDidMount() {
    this.props.getAEDsByBuilding(this.props.location.state.building.id);
  }
  
  render() {
    const {building} = this.props.location.state;
    const sortButtonLabel = this.state.sortConfig.direction === 'ascending' ? '(asc)' : '(desc)';
    return (
      <Fragment>
        <SearchField placeholder="Search..." type = "text" onChange={(e)=>this.setSearchKey(e)}/>
          <h2>AED's for {building.name}</h2>
          <p>Number of AED's in {building.name}: {this.props.AEDs.length}</p>
          {/* ???button on same line */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                  <button type="button" onClick={() => this.requestSort('location')}>Location {sortButtonLabel}</button>
                </th>
                <th>
                  {/* <button type="button" onClick={() => this.setSortedField('next')}>Next Upcoming Inspection</button> */}
                  Next Upcoming Inspection
                </th>
              </tr>
            </thead>
            {this.sortRows(building)}
          </table>
          <div className = "grid">
          <Link to={{ pathname: '/CreateAEDForm', state:{building:building}}}>
            <button className={"btn2 btn--back"} type="button" onClick={() => {}}>Add New AED</button>   
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
  
  export default withRouter(connect(mapStateToProps, { getAEDsByBuilding })(AEDList));
