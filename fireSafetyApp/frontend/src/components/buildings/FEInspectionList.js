import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFEInspecs } from '../../actions/FEs';
import { displayFEInspectionPDF } from "../../actions/pdfs";

export class FEInspection_List extends Component {
  static propTypes = {
    FEInspecs: PropTypes.array.isRequired,
    getFEInspecs: PropTypes.func.isRequired,
    displayFEInspectionPDF: PropTypes.func.isRequired
  };
  
  componentDidMount() {
    console.log(this.props);
    this.props.getFEInspecs();
    console.log('2:', this.props)
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
                  <td>{FEI.date_tested}</td>
                  <td>{FEI.tester}</td>
                  <td>
                    <div className="App">
                        <button className={"btn btn--medium"} type="button" onClick={() => {this.displayPDF(FEI.id)}}>
                            View PDF
                        </button>
                    </div>	
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </Fragment>
      );
    }
  }
  
  const mapStateToProps = (state) => ({
    FEInspecs: state.FEInspecs.FEInspecs,
  });
  
export default connect(mapStateToProps, { getFEInspecs, displayFEInspectionPDF })(FEInspection_List);