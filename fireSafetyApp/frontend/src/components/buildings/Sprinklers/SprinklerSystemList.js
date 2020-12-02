import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSpSysByBuilding } from '../../../actions/Sprinklers';
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";
import SearchField from "react-search-field"

export class SprinklerSystemList extends Component {

  static propTypes = {
    SprinklerSystems: PropTypes.array.isRequired,
    getSpSysByBuilding: PropTypes.func.isRequired,
  };

  state = {
    search: null
  };

  filter = (ss ,building) => {
		if (this.state.search == null) {
			return(
                <tr key={ss.id}>
                {/* ???Blane make this button blue text and underline, no box */}
                <td>
                <Link to={{ pathname: '/SprinklerSystem', state:{building:building, ss: ss}}}>
                    <button>
                    {ss.id}
                    </button>
                </Link>
                </td>
                <td>{ss.system_type}</td>
                {this.nextInspection(ss)}
            </tr>
			)
		}
		
		else if(ss.exnum.toLowerCase().includes(this.state.search.toLowerCase())) {
			return(
                <tr key={ss.id}>
                {/* ???Blane make this button blue text and underline, no box */}
                    <td>
                        <Link to={{ pathname: '/SprinklerSystem', state:{building:building, ss: ss}}}>
                            <button>
                                {ss.id}
                            </button>
                        </Link>
                    </td>
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
    if (ss.upcoming_weekly_inspection) {
        next = ss.upcoming_weekly_inspection;
        type = "(Weekly Inspection)";
    } else {
        next = ss.upcoming_monthly_inspection;
        type = "(Monthly Inspection)";
    }
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
          <h2>Sprinkler Systems for {building.name}</h2>
          <p>Number of Systems in {building.name}: {this.props.SprinklerSystems.length}</p>
          {/* ???button on same line */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>System Id</th>
                <th>System Type</th>
                <th>Next Upcoming Inspection</th>
              </tr>
            </thead>
            <tbody>
              {this.props.SprinklerSystems.map((ss) => (
               this.filter(ss, building)
              ))}
            </tbody>
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
