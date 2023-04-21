import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { stripesConnect, useOkapiKy } from '@folio/stripes/core';
import HarvestableLogs from '../views/HarvestableLogs';
import packageInfo from '../../package';
import loadPlainTextLog from './loadPlainTextLog';


const OldJobRoute = ({ resources, mutator, match }) => {
  const okapiKy = useOkapiKy();
  const [logFetchCount, setLogFetchCount] = useState(0);
  const [plainTextLog, setPlainTextLog] = useState();

  const handleClose = () => {
    mutator.query.update({ _path: `${packageInfo.stripes.route}/jobs` });
  };

  // See comments on loadPlainTextLog in HarvestableLogsRoute.js
  const load = () => loadPlainTextLog(okapiKy, `previous-jobs/${match.params.recId}/log`, setPlainTextLog);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(load, [setPlainTextLog, match.params.recId, logFetchCount]);

  const isLoading = (resources.job.isPending ||
                     resources.failedRecords.isPending ||
                     typeof plainTextLog !== 'string');

  // XXX note that the data key `harvestable` is misleading here
  return (
    <HarvestableLogs
      isLoading={isLoading}
      data={{
        harvestable: resources.job.records[0],
        failedRecords: resources.failedRecords.records[0],
        plainTextLog,
      }}
      handlers={{ onClose: handleClose }}
      refreshLog={() => setLogFetchCount(logFetchCount + 1)}
    />
  );
};


OldJobRoute.manifest = Object.freeze({
  query: {},
  job: {
    type: 'okapi',
    path: 'harvester-admin/previous-jobs/:{recId}',
  },
  failedRecords: {
    type: 'okapi',
    path: 'harvester-admin/previous-jobs/:{recId}/failed-records',
  },
});


OldJobRoute.propTypes = {
  resources: PropTypes.shape({
    job: PropTypes.shape({
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


export default stripesConnect(OldJobRoute);
