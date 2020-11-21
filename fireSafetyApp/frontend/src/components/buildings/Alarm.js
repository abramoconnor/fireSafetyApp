import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getALARMs, deleteALARMs } from '../../actions/Alarms';
import { Link, withRouter } from 'react-router-dom';
import {Button} from "react-bootstrap";

export class ALARM extends Component {

  static propTypes = {
    ALARMs: PropTypes.array.isRequired,
    getALARMs: PropTypes.func.isRequired,
    deleteALARMs: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getALARMs();
    this.setState();
  }
  
  render() {
    const {building} = this.props.location.state;
    return (
      <Fragment>
          <h2>Alarms for {building.name}</h2>   
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
              {this.props.ALARMs.map((ALARM) => (
                <tr key={ALARM.id}>
                  <td>{ALARM.id}</td>
                  <td>{ALARM.code}</td>
                  <td>{ALARM.last_inspection.split("T")[0]}</td>
                  <td>{ALARM.upcoming_inspection.split("T")[0]}</td>
                  <td>
                      <Link to={{ pathname: '/AlarmInspection', state:{building:building, alarm: ALARM}}}>
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
    ALARMs: state.ALARMs.ALARMs,
  });
  
  export default withRouter(connect(mapStateToProps, { getALARMs, deleteALARMs })(ALARM));
