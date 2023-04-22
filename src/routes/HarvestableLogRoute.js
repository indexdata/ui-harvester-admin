import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { stripesConnect, useOkapiKy } from '@folio/stripes/core';
import HarvestableLogs from '../views/HarvestableLogs';
import packageInfo from '../../package';
import loadPlainTextLog from '../util/loadPlainTextLog';


const HarvestableLogRoute = ({ resources, mutator, match }) => {
  const okapiKy = useOkapiKy();
  const [logFetchCount, setLogFetchCount] = useState(0);
  const [plainTextLog, setPlainTextLog] = useState();

  const handleClose = () => {
    mutator.query.update({ _path: `${packageInfo.stripes.route}/harvestables/${match.params.recId}` });
  };

  // We can't use stripes-connect for plainTextLog, as it assumes JSON responses: see the code at
  // https://github.com/folio-org/stripes-connect/blob/7009eec490b36365e59b009cb9fde9f3573ea669/RESTResource/RESTResource.js#L789
  const load = () => loadPlainTextLog(okapiKy, `harvestables/${match.params.recId}/log`, setPlainTextLog);
  // If we include okapi-ky in the useEffect dependencies, we get many fetches for some reason
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(load, [setPlainTextLog, match.params.recId, logFetchCount]);

  const isLoading = (resources.harvestable.isPending ||
                     resources.failedRecords.isPending ||
                     typeof plainTextLog !== 'string');
  return (
    <HarvestableLogs
      isLoading={isLoading}
      data={{
        record: resources.harvestable.records[0],
        failedRecords: resources.failedRecords.records[0],
        plainTextLog,
      }}
      handlers={{ onClose: handleClose }}
      refreshLog={() => setLogFetchCount(logFetchCount + 1)}
    />
  );
};


HarvestableLogRoute.manifest = Object.freeze({
  query: {},
  harvestable: {
    type: 'okapi',
    path: 'harvester-admin/harvestables/:{recId}',
  },
  failedRecords: {
    type: 'okapi',
    path: 'harvester-admin/harvestables/:{recId}/failed-records',
  },
});


HarvestableLogRoute.propTypes = {
  resources: PropTypes.shape({
    harvestable: PropTypes.shape({
      isPending: PropTypes.bool.isRequired,
      records: PropTypes.arrayOf(
        PropTypes.shape({}).isRequired,
      ).isRequired,
    }).isRequired,
    failedRecords: PropTypes.shape({
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


export default stripesConnect(HarvestableLogRoute);
