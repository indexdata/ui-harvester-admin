import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from '@folio/stripes/components';

const PipelineSettings = ({ label }) => (
  <Pane defaultWidth="fill" paneTitle={label}>
    This is the pipeline settings page
  </Pane>
);

PipelineSettings.propTypes = {
  label: PropTypes.object.isRequired,
};

export default PipelineSettings;
