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
      if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
      if (error.msg.username) alert.error(error.msg.username.join());
    }

    if (message !== prevProps.message) {
      if (message.addBuilding) alert.success(message.addBuilding);
      if (message.addFEInspection) alert.success(message.addFEInspection);
      if (message.deleteFE) alert.success(message.deleteFE);
      if (message.addFE) alert.success(message.addFE);
      if (message.feTransfer) alert.success(message.feTransfer);
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
