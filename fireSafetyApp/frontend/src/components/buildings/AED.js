import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAEDs, deleteAEDs } from '../../actions/AEDs';
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";

export class AED extends Component {

  static propTypes = {
    AEDs: PropTypes.array.isRequired,
    getAEDs: PropTypes.func.isRequired,
    deleteAEDs: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAEDs();
    this.setState();
  }
  
  render() {
    const {building} = this.props.location.state;
    return (
      <Fragment>
          <h2>AEDs for {building.name}</h2>   
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
              {this.props.AEDs.map((AED) => (
                <tr key={AED.id}>
                  <td>{AED.id}</td>
                  <td>{AED.code}</td>
                  <td>{AED.last_inspection.split("T")[0]}</td>
                  <td>{AED.upcoming_inspection.split("T")[0]}</td>
                  <td>
                      <Link to={{ pathname: '/FEInspection', state:{building:building, aed: AED}}}>
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
    AEDs: state.AEDs.AEDs,
  });
  
  export default withRouter(connect(mapStateToProps, { getAEDs, deleteAEDs })(AED));
