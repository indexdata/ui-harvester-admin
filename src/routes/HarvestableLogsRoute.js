import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { stripesConnect, useOkapiKy } from '@folio/stripes/core';
import HarvestableLogs from '../views/HarvestableLogs';
import packageInfo from '../../package';


const HarvestableLogsRoute = ({ resources, mutator, match }) => {
  const okapiKy = useOkapiKy();
  const [plainTextLog, setPlainTextLog] = useState();

  const handleClose = () => {
    mutator.query.update({ _path: `${packageInfo.stripes.route}/harvestables/${match.params.recId}` });
  };

  // We can't use stripes-connect for plainTextLog, as it assumes JSON responses: see the code at
  // https://github.com/folio-org/stripes-connect/blob/7009eec490b36365e59b009cb9fde9f3573ea669/RESTResource/RESTResource.js#L789
  useEffect(() => {
    async function fetchData() {
      const recId = match.params.recId;
      const res = await okapiKy(`harvester-admin/harvestables/${recId}/log`, {
        headers: {
          'Accept': 'text/plain'
        }
      });
      const data = await res.text();
      setPlainTextLog(data);
    }
    fetchData();
    // If we include okapi-ky in the useEffect dependencies, we get many fetches for some reason
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPlainTextLog, match.params.recId]);

  const isLoading = (resources.harvestable.isPending ||
                     resources.failedRecords.isPending ||
                     typeof plainTextLog !== 'string');
  return (
    <HarvestableLogs
      isLoading={isLoading}
      data={{
        harvestable: resources.harvestable.records,
        failedRecords: resources.failedRecords.records,
        plainTextLog,
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
  failedRecords: {
    type: 'okapi',
    path: 'harvester-admin/harvestables/:{recId}/failed-records',
    GET: {
      headers: {
        'Accept': 'text/plain'
      }
    }
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


export default stripesConnect(HarvestableLogsRoute);
