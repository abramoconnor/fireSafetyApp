import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFEs, deleteFEs } from '../../actions/FEs';
import { displayFEInspectionPDF } from "../../actions/pdfs";
import { Link, withRouter } from 'react-router-dom';

export class Fire_Extinguisher extends Component {
  state = {
		building: this.props.location.state.building
	};

  static propTypes = {
    FEs: PropTypes.array.isRequired,
    getFEs: PropTypes.func.isRequired,
    deleteFEs: PropTypes.func.isRequired,
    displayFEInspectionPDF: PropTypes.func.isRequired
  };
  
  componentDidMount() {
    this.props.getFEs();
  }
  
  displayPDF = (id) => {
    this.props.displayFEInspectionPDF(id);
  }
    
  render() {
    const {building} = this.props.location.state
    return (
      <Fragment>
          <h2>Fire Extinguishers for {building.name}</h2>   
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Last Inspected</th>
                <th>Upcomming inspection</th>
              </tr>
            </thead>
            <tbody>
              {this.props.FEs.map((FE) => (
                <tr key={FE.id}>
                  <td>{FE.id}</td>
                  <td>{FE.code}</td>
                  <td>{FE.last_inspection}</td>
                  <td>{FE.upcoming_inspection}</td>
                  <td>
                  {/* <Link to={{ pathname: '/Form'}}> */}
              <div className =  "App">
              <button
                className={"btn btn--medium "} 
                type = "button"
                onClick={() => {this.displayPDF(FE.id)}}>
                  List of Inspections
                </button>
              </div>	
            {/* </Link> */}
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
    FEs: state.FEs.FEs,
  });
  
  export default withRouter(connect(mapStateToProps, { getFEs, deleteFEs, displayFEInspectionPDF })(Fire_Extinguisher));
