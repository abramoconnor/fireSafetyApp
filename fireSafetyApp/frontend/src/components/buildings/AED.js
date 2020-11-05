import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAEDs, deleteAEDs } from '../../actions/AEDs';

export class AED extends Component {

    static propTypes = {
        AEDs: PropTypes.array.isRequired,
        getAEDs: PropTypes.func.isRequired,
        deleteAEDs: PropTypes.func.isRequired,
      };
    
      componentDidMount() {
        this.props.getAEDs();
      }

	render() {
        const {building} = this.props.location.state
	  return (
		<Fragment>
			  <h2>AEDs for {building.name}</h2>
              
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
            {this.props.AEDs.map((AED) => (
              <tr key={AED.id}>
                <td>{AED.id}</td>
                <td>{AED.code}</td>
                <td>{AED.last_inspection}</td>
                <td>{AED.upcoming_inspection}</td>
                <td>
                  <button
                    onClick={this.props.deleteAEDs.bind(this, AED.id)}
                    className="btn btn-danger btn-sm"
                  >
                    {' '}
                    Delete
                  </button>
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
    AEDs: state.AEDs.AEDs,
  });
  
  export default connect(mapStateToProps, { getAEDs, deleteAEDs })(AED);