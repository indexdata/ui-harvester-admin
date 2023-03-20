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

  return (
    <HarvestableLogs
      isLoading={resources.harvestable.isPending || typeof plainTextLog !== 'string'}
      data={{
        harvestable: resources.harvestable.records,
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
