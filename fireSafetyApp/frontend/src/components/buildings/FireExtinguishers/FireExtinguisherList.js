import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFEsByBuilding } from '../../../actions/FEs';
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";
import SearchField from "react-search-field"

export class FireExtinguisherList extends Component {
  state = {
    search: null,
    sortConfig: {
      field: 'exnum',
      direction: 'ascending'
    },
  };

  static propTypes = {
    FEs: PropTypes.array.isRequired,
    getFEsByBuilding: PropTypes.func.isRequired,
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
    let sortedExtinguishers = [...this.props.FEs];
    const {sortConfig} = this.state;
    if (sortConfig.field) {
      sortedExtinguishers.sort((a, b) => {
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
        {sortedExtinguishers.map(fe => this.filter(fe, building))}
      </tbody>
    )
  }

  filter = (fe ,building) => {
		if (this.state.search == null)
		{
			return(
        <tr key={fe.id}>
        
        <td>
          <Link to={{ pathname: '/FireExtinguisher', state:{building:building, fe: fe}}}>
            <button className ="btn--table">
            {fe.exnum}
            </button>
          </Link>
        </td>
        {this.nextInspection(fe)}
      </tr>
			)
		}
		
		else if(fe.exnum.toLowerCase().includes(this.state.search.toLowerCase()))
		{
			return(
        <tr key={fe.id}>
        
        <td>
          <Link to={{ pathname: '/FireExtinguisher', state:{building:building, fe: fe}}}>
            <button className ="btn--table">
            {fe.exnum}
            </button>
          </Link>
        </td>
        {this.nextInspection(fe)}
      </tr>
			)
    }
  }
  
  // function calculates the inspection closest to the current date
  nextInspection = (fe) => {
    let next = fe.upcoming_monthly_inspection;
    let type = "(Monthly Inspection)";
    if (fe.upcoming_annual_inspection < next ) {
      next = fe.upcoming_annual_inspection;
      type = "(Annual Inspection)";
    } else if (fe.upcoming_6year_service < next) {
      next = fe.upcoming_6year_service;
      type = "(6 Year Service)";
    } else if (fe.upcoming_12year_test < next) {
      next = fe.upcoming_12year_test;
      type = "(12 Year Test)";
    }
    // dates are in UTC so creating date object (nd = newDate) from date string (next) and displaying it in local time
    const nd = new Date(next);
    return (
      <td>{nd.toLocaleDateString().split("T")[0]} {type}</td>
    )
  }

  setSearchKey = (e) =>
	{
		this.setState({search:e.target.value})
	}
  componentDidMount() {
    this.props.getFEsByBuilding(this.props.location.state.building.id);
  }
  
  render() {
    const {building} = this.props.location.state;
    const sortButtonLabel = this.state.sortConfig.direction === 'ascending' ? '(asc)' : '(desc)';
    return (
      <Fragment>
        
          <div className="wrapper right">
						<div className= "container">
							<input type="text" className="input" placeholder="Search..." onChange={(e)=>this.setSearchKey(e)}></input>											
						</div>
					</div>
        
          <h2>Fire Extinguishers for {building.name}</h2>
          <p>Number of Extinguishers in {building.name}: {this.props.FEs.length}</p>
          {/* ???button on same line */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                  <button type="button" className ="btn--table" onClick={() => this.requestSort('exnum')}>Extinguisher Number {sortButtonLabel}</button>
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
          <Link to={{ pathname: '/CreateFEForm', state:{building:building}}}>
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
    FEs: state.FEs.FEs,
  });
  
  export default withRouter(connect(mapStateToProps, { getFEsByBuilding })(FireExtinguisherList));
