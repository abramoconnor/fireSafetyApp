import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFEs, deleteFEs } from '../../actions/FEs';
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";

export class Fire_Extinguisher extends Component {

  static propTypes = {
    FEs: PropTypes.array.isRequired,
    getFEs: PropTypes.func.isRequired,
    deleteFEs: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getFEs();
    this.setState();
  }
  
  render() {
    const {building} = this.props.location.state;
    return (
      <Fragment>
          <h2>Fire Extinguishers for {building.name}</h2>   
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
              {this.props.FEs.map((FE) => (
                <tr key={FE.id}>
                  <td>{FE.id}</td>
                  <td>{FE.code}</td>
                  <td>{FE.last_inspection.split("T")[0]}</td>
                  <td>{FE.upcoming_inspection.split("T")[0]}</td>
                  <td>
                      <Link to={{ pathname: '/FEInspection', state:{building:building, fe: FE}}}>
                        <div className="App">
                          <button className={"btn btn--small"} type="button" onClick={() => {console.log("to inspection")}}>
                            Inspection List
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
    FEs: state.FEs.FEs,
  });
  
  export default withRouter(connect(mapStateToProps, { getFEs, deleteFEs })(Fire_Extinguisher));
