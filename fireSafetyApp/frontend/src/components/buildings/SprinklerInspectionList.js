import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSprinklerInspecs } from '../../actions/Sprinklers';
import { displaySprinklerInspectionPDF } from "../../actions/pdfs";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

export class SprinklerInspection_List extends Component {
  static propTypes = {
    SprinklerInspecs: PropTypes.array.isRequired,
    getSprinklerInspecs: PropTypes.func.isRequired,
    displaySprinklerInspectionPDF: PropTypes.func.isRequired
  };
  
  componentDidMount() {
    this.props.getSprinklerInspecs();
  }
  
  displayPDF = (id) => {
    this.props.displaySprinklerInspectionPDF(id);
  }
    
  render() {
    const {building, sprinkler} = this.props.location.state
    return (
      <Fragment>
          <h2>Inspections for Sprinkler: {sprinkler.code}</h2>   
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date Tested</th>
                <th>By</th>
              </tr>
            </thead>
            <tbody>
              {this.props.SprinklerInspecs.map((sprinkler) => (
                <tr key={sprinkler.id}>
                  <td>{sprinkler.id}</td>
                  <td>{sprinkler.date_tested.split("T")[0]}</td>
                  <td>{sprinkler.tester}</td>
                  <td>
                    <div className="App">
                        <button className={"btn btn--small"} type="button" onClick={() => {this.displayPDF(sprinkler.id)}}>
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
          <Link to={{ pathname: "/Sprinkler", state:{building:building}}}>
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
    SprinklerInspecs: state.SprinklerInspecs.SprinklerInspecs,
  });
  
export default connect(mapStateToProps, { getSprinklerInspecs, displaySprinklerInspectionPDF })(SprinklerInspection_List);