import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAEDInspecs } from '../../actions/AEDs';
import { displayAEDInspectionPDF } from "../../actions/pdfs";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

export class AEDInspection_List extends Component {
  static propTypes = {
    AEDInspecs: PropTypes.array.isRequired,
    getAEDInspecs: PropTypes.func.isRequired,
    displayAEDInspectionPDF: PropTypes.func.isRequired
  };
  
  componentDidMount() {
    this.props.getAEDInspecs();
  }
  
  displayPDF = (id) => {
    this.props.displayAEDInspectionPDF(id);
  }
    
  render() {
    const {building, aed} = this.props.location.state
    return (
      <Fragment>
          <h2>Inspections for AED: {aed.code}</h2>   
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date Tested</th>
                <th>By</th>
              </tr>
            </thead>
            <tbody>
              {this.props.AEDInspecs.map((aed) => (
                <tr key={aed.id}>
                  <td>{aed.id}</td>
                  <td>{aed.date_tested.split("T")[0]}</td>
                  <td>{aed.tester}</td>
                  <td>
                    <div className="App">
                        <button className={"btn btn--small"} type="button" onClick={() => {this.displayPDF(aed.id)}}>
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
          <Link to={{ pathname: "/AED", state:{building:building}}}>
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
    AEDInspecs: state.AEDInspecs.AEDInspecs,
  });
  
export default connect(mapStateToProps, { getAEDInspecs, displayAEDInspectionPDF })(AEDInspection_List);