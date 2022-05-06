import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import FullHarvestable from '../views/FullHarvestable';


const FullHarvestableRoute = (props) => {
  const deleteRecord = () => props.mutator.harvestable.DELETE({ id: props.match.params.recId });

  return <FullHarvestable {...props} deleteRecord={deleteRecord} />;
};


FullHarvestableRoute.manifest = Object.freeze({
  query: {},
  harvestable: {
    type: 'okapi',
    path: 'harvester-admin/harvestables/:{recId}',
  },
  run: {
    type: 'okapi',
    path: 'harvester-admin/jobs/run/:{recId}',
    fetch: false,
  },
  stop: {
    type: 'okapi',
    path: 'harvester-admin/jobs/stop/:{recId}',
    fetch: false,
  },
});


FullHarvestableRoute.propTypes = {
  defaultWidth: PropTypes.string,
  resources: PropTypes.shape({
    harvestable: PropTypes.shape({
      records: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
  mutator: PropTypes.shape({
    query: PropTypes.shape({
      update: PropTypes.func.isRequired,
    }).isRequired,
    run: PropTypes.shape({
      PUT: PropTypes.func.isRequired,
    }).isRequired,
    stop: PropTypes.shape({
      PUT: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired
};


FullHarvestableRoute.propTypes = {
  mutator: PropTypes.shape({
    harvestable: PropTypes.shape({
      DELETE: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

FullHarvestableRoute.defaultProps = {
  defaultWidth: '60%',
};

export default stripesConnect(FullHarvestableRoute);
