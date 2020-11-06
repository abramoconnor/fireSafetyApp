import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFEInspecs } from '../../actions/FEs';
import { displayFEInspectionPDF } from "../../actions/pdfs";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

export class FEInspection_List extends Component {
  static propTypes = {
    FEInspecs: PropTypes.array.isRequired,
    getFEInspecs: PropTypes.func.isRequired,
    displayFEInspectionPDF: PropTypes.func.isRequired
  };
  
  componentDidMount() {
    this.props.getFEInspecs();
  }
  
  displayPDF = (id) => {
    this.props.displayFEInspectionPDF(id);
  }
    
  render() {
    const {building, fe} = this.props.location.state
    return (
      <Fragment>
          <h2>Inspections for Fire Extinguisher: {fe.code}</h2>   
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date Tested</th>
                <th>By</th>
              </tr>
            </thead>
            <tbody>
              {this.props.FEInspecs.map((FEI) => (
                <tr key={FEI.id}>
                  <td>{FEI.id}</td>
                  <td>{FEI.date_tested.split("T")[0]}</td>
                  <td>{FEI.tester}</td>
                  <td>
                    <div className="App">
                        <button className={"btn btn--small"} type="button" onClick={() => {this.displayPDF(FEI.id)}}>
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
          <Link to={{ pathname: "/Fire Extinguisher", state:{building:building}}}>
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
    FEInspecs: state.FEInspecs.FEInspecs,
  });
  
export default connect(mapStateToProps, { getFEInspecs, displayFEInspectionPDF })(FEInspection_List);