import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSpSysByBuilding } from '../../../actions/Sprinklers';
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";
import SearchField from "react-search-field"

export class SprinklerSystemList extends Component {
  state = {
    search: null,
    sortConfig: {
      field: 'exnum',
      direction: 'ascending'
    },
  };

  static propTypes = {
    SprinklerSystems: PropTypes.array.isRequired,
    getSpSysByBuilding: PropTypes.func.isRequired,
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
    let sortedSprinklerSystems = [...this.props.SprinklerSystems];
    const {sortConfig} = this.state;
    if (sortConfig.field) {
      sortedSprinklerSystems.sort((a, b) => {
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
        {sortedSprinklerSystems.map(ss => this.filter(ss, building))}
      </tbody>
    )
  }

  filter = (ss ,building) => {
		if (this.state.search == null) {
			return(
                <tr key={ss.id}>
                {/* ???Blane make this button blue text and underline, no box */}
                <td>
                <Link to={{ pathname: '/SprinklerSystem', state:{building:building, ss: ss}}}>
                    <button>
                    {ss.coverage}
                    </button>
                </Link>
                </td>
                <td>{ss.system_type}</td>
                {this.nextInspection(ss)}
            </tr>
			)
		} else if(ss.coverage.toLowerCase().includes(this.state.search.toLowerCase())) {
			return(
                <tr key={ss.id}>
                {/* ???Blane make this button blue text and underline, no box */}
                    <td>
                        <Link to={{ pathname: '/SprinklerSystem', state:{building:building, ss: ss}}}>
                            <button>
                                {ss.coverage}
                            </button>
                        </Link>
                    </td>
                    <td>{ss.system_type}</td>
                    {this.nextInspection(ss)}
                </tr>
			)
    }
  }
	

	setSearchKey = (key) => {
		this.setState({search:key})
	}

  componentDidMount() {
    this.props.getSpSysByBuilding(this.props.location.state.building.id);
  }

  // function calculates the inspection closest to the current date
  nextInspection = (ss) => {
    let next;
    let type;
    if (ss.system_type === 'Wet') {
      next = ss.upcoming_monthly_inspection;
      type = "(Monthly Inspection)";
      if (ss.upcoming_quarterly_inspection < next ) {
        next = ss.upcoming_quarterly_inspection;
        type = "(Quarterly Inspection)";
      } else if (ss.upcoming_semiannual_inspection < next) {
        next = ss.upcoming_semiannual_inspection;
        type = "(Semi-Annual Inspection)";
      } else if (ss.upcoming_annual_inspection < next) {
        next = ss.upcoming_annual_inspection;
        type = "(Annual Inspection)";
      }
    } else {
        next = ss.upcoming_weekly_inspection;
        type = "(Weekly Inspection)";
        if (ss.upcoming_monthly_inspection < next ) {
          next = ss.upcoming_monthly_inspection;
          type = "(Monthly Inspection)";
      } else if (ss.upcoming_quarterly_inspection < next ) {
        next = ss.upcoming_quarterly_inspection;
        type = "(Quarterly Inspection)";
      } else if (ss.upcoming_semiannual_inspection < next) {
        next = ss.upcoming_semiannual_inspection;
        type = "(Semi-Annual Inspection)";
      } else if (ss.upcoming_annual_inspection < next) {
        next = ss.upcoming_annual_inspection;
        type = "(Annual Inspection)";
      }
    }
    // dates are in UTC so creating date object (nd = newDate) from date string (next) and displaying it in local time
    const nd = new Date(next);
    return (
      <td>{nd.toLocaleDateString().split("T")[0]} {type}</td>
    )
  }
  
  render() {
    const {building} = this.props.location.state;
    const sortButtonLabel = this.state.sortConfig.direction === 'ascending' ? '(asc)' : '(desc)';
    return (
      <Fragment>
        <SearchField placeholder="Search..." type = "text" onChange={(e)=>this.setSearchKey(e)}/>
          <h2>Sprinkler Systems for {building.name}</h2>
          <p>Number of Systems in {building.name}: {this.props.SprinklerSystems.length}</p>
          {/* ???button on same line */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                  <button type="button" onClick={() => this.requestSort('coverage')}>Coverage Area {sortButtonLabel}</button>
                </th>
                <th>System Type</th>
                <th>Next Upcoming Inspection</th>
              </tr>
            </thead>
            {this.sortRows(building)}
          </table>
          <div className = "grid">
          <Link to={{ pathname: '/CreateSSForm', state:{building:building}}}>
            <button className={"btn2 btn--back"} type="button" onClick={() => {}}>Add New System</button>   
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
    SprinklerSystems: state.SPRINKLERs.SprinklerSystems,
  });
  
  export default withRouter(connect(mapStateToProps, { getSpSysByBuilding })(SprinklerSystemList));
