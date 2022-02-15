import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from '@folio/stripes/components';

const NullSettings = ({ label }) => (
  <Pane defaultWidth="fill" paneTitle={label}>
    This is the null settings page
  </Pane>
);

NullSettings.propTypes = {
  label: PropTypes.object.isRequired,
};

export default NullSettings;
