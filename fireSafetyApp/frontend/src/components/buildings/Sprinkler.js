import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSPRINKLERs, deleteSPRINKLERs } from '../../actions/Sprinklers';
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";

export class SPRINKLER extends Component {

  static propTypes = {
    SPRINKLERs: PropTypes.array.isRequired,
    getSPRINKLERs: PropTypes.func.isRequired,
    deleteSPRINKLERs: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getSPRINKLERs();
    this.setState();
  }
  
  render() {
    const {building} = this.props.location.state;
    return (
      <Fragment>
          <h2>Sprinklers for {building.name}</h2>   
          <table className="table table-striped">
            <thead>
              <tr>
              <th>ID</th>
                <th>Code</th>
                <th>Last Inspected</th>
                <th>Upcoming Inspection</th>
              </tr>
            </thead>
            <tbody>
              {this.props.SPRINKLERs.map((SPRINKLER) => (
                <tr key={SPRINKLER.id}>
                  <td>{SPRINKLER.id}</td>
                  <td>{SPRINKLER.code}</td>
                  <td>{SPRINKLER.last_inspection.split("T")[0]}</td>
                  <td>{SPRINKLER.upcoming_inspection.split("T")[0]}</td>
                  <td>
                      <Link to={{ pathname: '/SprinklerInspection', state:{building:building, sprinkler: SPRINKLER}}}>
                        <div className="App">
                          <button className={"btn btn--small"} type="button" onClick={() => {console.log("to inspection")}}>
                            List of Inspections
                          </button>
                        </div>	
                      </Link>
                  </td>
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
    SPRINKLERs: state.SPRINKLERs.SPRINKLERs,
  });
  
  export default withRouter(connect(mapStateToProps, { getSPRINKLERs, deleteSPRINKLERs })(SPRINKLER));
