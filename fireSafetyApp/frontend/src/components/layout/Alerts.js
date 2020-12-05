import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.exnum) alert.error(`Extinguisher Number: ${error.msg.exnum.join()}`);
      if (error.msg.location) alert.error(`Location: ${error.msg.location.join()}`);
      if (error.msg.air_pressure) alert.error(`Air Pressure: ${error.msg.air_pressure.join()}`);
      if (error.msg.water_pressure) alert.error(`Water Pressure: ${error.msg.water_pressure.join()}`);
      if (error.msg.suction_pressure) alert.error(`Suction Pressure: ${error.msg.suction_pressure.join()}`);
      if (error.msg.discharge_pressure) alert.error(`Discharge Pressure: ${error.msg.discharge_pressure.join()}`);
      if (error.msg.run_time) alert.error(`Run Time: ${error.msg.run_time.join()}`);
      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
      if (error.msg.first_name) alert.error(`First Name: ${error.msg.first_name.join()}`);
      if (error.msg.last_name) alert.error(`Last Name: ${error.msg.last_name.join()}`);
      if (error.msg.username) alert.error(`Email: ${error.msg.username.join()}`);
      if (error.msg.password) alert.error(`Password: ${error.msg.password.join()}`);
    }

    if (message !== prevProps.message) {
      if (message.addBuilding) alert.success(message.addBuilding);
      if (message.deleteBuilding) alert.success(message.deleteBuilding);
      if (message.addAlarmSys) alert.success(message.addAlarmSys);
      if (message.updateAS) alert.success(message.updateAS);
      if (message.deleteAlarmSystem) alert.success(message.deleteAlarmSystem);
      if (message.addASInspection) alert.success(message.addASInspection);
      if (message.addAED) alert.success(message.addAED);
      if (message.deleteAED) alert.success(message.deleteAED);
      if (message.updateAED) alert.success(message.updateAED);
      if (message.AEDLocation) alert.success(message.AEDLocation);
      if (message.addAEDInspection) alert.success(message.addAEDInspection);
      if (message.addFE) alert.success(message.addFE);
      if (message.deleteFE) alert.success(message.deleteFE);
      if (message.updateFE) alert.success(message.updateFE);
      if (message.addFEInspection) alert.success(message.addFEInspection);
      if (message.feTransfer) alert.success(message.feTransfer);
      if (message.deletePump) alert.success(message.deletePump);
      if (message.addPump) alert.success(message.addPump);
      if (message.updatePump) alert.success(message.updatePump);
      if (message.addPumpInspection) alert.success(message.addPumpInspection);
      if (message.deleteSprinklerSystem) alert.success(message.deleteSprinklerSystem);
      if (message.addSprinklerSystem) alert.success(message.addSprinklerSystem);
      if (message.updateSS) alert.success(message.updateSS);
      if (message.addSSInspection) alert.success(message.addSSInspection);
      if (message.addFENote) alert.success(message.addFENote);
      if (message.deleteFENotes) alert.success(message.deleteFENotes);
      if (message.addASNote) alert.success(message.addASNote);
      if (message.deleteASNotes) alert.success(message.deleteASNotes);
      if (message.addSSNote) alert.success(message.addSSNote);
      if (message.deleteSSNotes) alert.success(message.deleteSSNotes);
      if (message.addAEDNote) alert.success(message.addAEDNote);
      if (message.deleteAEDNotes) alert.success(message.deleteAEDNotes);
      if (message.addPumpNote) alert.success(message.addPumpNote);
      if (message.deletePumpNotes) alert.success(message.deletePumpNotes);
      if (message.newUserRegistered) alert.success(message.newUserRegistered);
      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
      if (message.weekly) alert.error(message.weekly);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
