import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import HarvestableLogs from '../views/HarvestableLogs';
import packageInfo from '../../package';


const HarvestableLogsRoute = ({ resources, mutator, match }) => {
  const handleClose = () => {
    mutator.query.update({ _path: `${packageInfo.stripes.route}/harvestables/${match.params.recId}` });
  };

  return (
    <HarvestableLogs
      isLoading={resources.harvestable.isPending || resources.log.isPending}
      data={{
        harvestable: resources.harvestable.records,
        log: resources.log.records,
      }}
      handlers={{ onClose: handleClose }}
    />
  );
};


HarvestableLogsRoute.manifest = Object.freeze({
  query: {},
  harvestable: {
    type: 'okapi',
    path: 'harvester-admin/harvestables/:{recId}',
  },
  log: {
    type: 'okapi',
    path: 'harvester-admin/harvestables/:{recId}/log',
    GET: {
      headers: {
        // XXX this is ignored by stripes-connect: I don't understand why
        'Accept': 'text/plain',
      },
    },
  },
});


HarvestableLogsRoute.propTypes = {
  resources: PropTypes.shape({
    harvestable: PropTypes.shape({
      isPending: PropTypes.bool.isRequired,
      records: PropTypes.arrayOf(
        PropTypes.shape({}).isRequired,
      ).isRequired,
    }).isRequired,
    log: PropTypes.shape({
      isPending: PropTypes.bool.isRequired,
      records: PropTypes.arrayOf(
        PropTypes.shape({}).isRequired,
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
  }).isRequired,
};


export default stripesConnect(HarvestableLogsRoute);
