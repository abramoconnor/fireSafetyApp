import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAlarmInspecs } from '../../actions/Alarms';
import { displayAlarmInspectionPDF } from "../../actions/pdfs";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

export class AlarmInspection_List extends Component {
  static propTypes = {
    AlarmInspecs: PropTypes.array.isRequired,
    getAlarmInspecs: PropTypes.func.isRequired,
    displayAlarmInspectionPDF: PropTypes.func.isRequired
  };
  
  componentDidMount() {
    this.props.getAlarmInspecs();
  }
  
  displayPDF = (id) => {
    this.props.displayAlarmInspectionPDF(id);
  }
    
  render() {
    const {building, alarm} = this.props.location.state
    return (
      <Fragment>
          <h2>Inspections for Alarm: {alarm.code}</h2>   
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date Tested</th>
                <th>By</th>
              </tr>
            </thead>
            <tbody>
              {this.props.AlarmInspecs.map((alarm) => (
                <tr key={alarm.id}>
                  <td>{alarm.id}</td>
                  <td>{alarm.date_tested.split("T")[0]}</td>
                  <td>{alarm.tester}</td>
                  <td>
                    <div className="App">
                        <button className={"btn btn--small"} type="button" onClick={() => {this.displayPDF(alarm.id)}}>
                            View PDF
                        </button>
                    </div>	
                  </td>
                  <td>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to={{ pathname: "/Alarm", state:{building:building}}}>
						<Button 
						className={"btn btn--mediumSmall"}
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
    AlarmInspecs: state.AlarmInspecs.AlarmInspecs,
  });
  
export default connect(mapStateToProps, { getAlarmInspecs, displayAlarmInspectionPDF })(AlarmInspection_List);