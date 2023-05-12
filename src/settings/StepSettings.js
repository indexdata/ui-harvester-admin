import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from '@folio/stripes/components';

const StepSettings = ({ label }) => (
  <Pane defaultWidth="fill" paneTitle={label}>
    This is the step settings page
  </Pane>
);

StepSettings.propTypes = {
  label: PropTypes.object.isRequired,
};

export default StepSettings;
