import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFEsByBuilding } from '../../actions/FEs';
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";

export class FireExtinguisherList extends Component {

  static propTypes = {
    FEs: PropTypes.array.isRequired,
    getFEsByBuilding: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getFEsByBuilding(this.props.location.state.building.id);
    console.log(this)
  }

  nextInspection = (fe) => {
    let next = fe.upcoming_monthly_inspection;
    if (fe.upcoming_annual_inspection < next ) {
      next = fe.upcoming_annual_inspection
    } else if (fe.upcoming_6year_service < next) {
      next = fe.upcoming_6year_service
    } else if (fe.upcoming_12year_test < next) {
      next = fe.upcoming_12year_test
    }
    return next.split("T")[0];
  }
  
  render() {
    const {building} = this.props.location.state;
    return (
      <Fragment>
          <h2>Fire Extinguishers for {building.name}</h2>
          <p>Number of Extinguishers in {building.name}: {this.props.FEs.length}</p>
          {/* ???button on same line */}
          <Link to={{ pathname: '/CreateFEForm', state:{building:building}}}>
            <button className={"btn btn--small"} type="button" onClick={() => {console.log("addnew")}}>+</button>   
          </Link>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Extinguisher Number</th>
                <th>Next Upcoming Inspection</th>
              </tr>
            </thead>
            <tbody>
              {this.props.FEs.map((FE) => (
                <tr key={FE.id}>
                  {/* ???Blane make this button blue text and underline, no box */}
                  <td>
                    <Link to={{ pathname: '/FireExtinguisher', state:{building:building, fe: FE}}}>
                      <button>{FE.exnum}</button>
                    </Link>
                  </td>
                  {/* ???logic to get next upcoming */}
                  <td>{this.nextInspection(FE)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to={{ pathname: '/Staging', state:{building:building}}}>
						<Button 
						className={"btn btn--back"}
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
    FEs: state.FEs.FEs,
  });
  
  export default withRouter(connect(mapStateToProps, { getFEsByBuilding })(FireExtinguisherList));
