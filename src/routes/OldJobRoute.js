import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import OldJob from '../views/OldJob';


const OldJobRoute = (props) => {
  // Nothing to be done here
  return <OldJob {...props} />;
};


OldJobRoute.manifest = Object.freeze({
  query: {},
  job: {
    type: 'okapi',
    path: 'harvester-admin/previous-jobs/:{recId}',
  },
});


OldJobRoute.propTypes = {
  defaultWidth: PropTypes.string,
  resources: PropTypes.shape({
    job: PropTypes.shape({
      records: PropTypes.arrayOf(
        PropTypes.object.isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
  mutator: PropTypes.shape({
    query: PropTypes.shape({
      update: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired
};

OldJobRoute.defaultProps = {
  defaultWidth: '60%',
};

export default stripesConnect(OldJobRoute);
