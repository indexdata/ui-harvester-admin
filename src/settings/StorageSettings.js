import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from '@folio/stripes/components';

const StorageSettings = ({ label }) => (
  <Pane defaultWidth="fill" paneTitle={label}>
    This is the storage settings page
  </Pane>
);

StorageSettings.propTypes = {
  label: PropTypes.object.isRequired,
};

export default StorageSettings;
