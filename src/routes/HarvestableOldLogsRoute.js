import React, { useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { stripesConnect } from '@folio/stripes/core';
import { StripesConnectedSource } from '@folio/stripes/smart-components';
import HarvestableOldLogs from '../views/HarvestableOldLogs';
import packageInfo from '../../package';


const INITIAL_RESULT_COUNT = 100;
const RESULT_COUNT_INCREMENT = 100;


const HarvestableOldLogsRoute = ({ stripes, resources, mutator, match }) => {
  let [source, setSource] = useState(); // eslint-disable-line prefer-const
  if (!source) {
    source = new StripesConnectedSource({ resources, mutator }, stripes.logger, 'reportTitles');
    setSource(source);
  } else {
    source.update({ resources, mutator }, 'reportTitles');
  }

  const handleClose = () => {
    mutator.query.update({ _path: `${packageInfo.stripes.route}/harvestables/${match.params.recId}` });
  };

  const handleNeedMoreData = () => source.fetchMore(RESULT_COUNT_INCREMENT);

  const hasLoaded = resources.harvestable.hasLoaded && resources.oldLogs.hasLoaded;
  const error = resources.oldLogs.failed ? resources.oldLogs.failed.message : undefined;

  return (
    <HarvestableOldLogs
      data={{
        harvestable: resources.harvestable.records?.[0],
        oldLogs: resources.oldLogs.records,
      }}
      resultCount={resources.oldLogs.other?.totalRecords}
      query={resources.query}
      updateQuery={mutator.query.update}
      hasLoaded={hasLoaded}
      error={error}
      handlers={{ onClose: handleClose }}
      onNeedMoreData={handleNeedMoreData}
    />
  );
};


HarvestableOldLogsRoute.manifest = Object.freeze({
  query: {},
  resultCount: { initialValue: INITIAL_RESULT_COUNT },
  harvestable: {
    type: 'okapi',
    path: 'harvester-admin/harvestables/:{recId}',
  },
  oldLogs: {
    type: 'okapi',
    path: 'harvester-admin/previous-jobs',
    throwErrors: false,
    records: 'previousJobs',
    recordsRequired: '%{resultCount}',
    perRequest: RESULT_COUNT_INCREMENT,
    params: {
      query: (_queryParams, pathComponents) => {
        const qp = { harvestableId: pathComponents.recId };
        return queryString.stringify(qp);
      },
    },
  },
});


HarvestableOldLogsRoute.propTypes = {
  stripes: PropTypes.shape({
    logger: PropTypes.object.isRequired,
  }).isRequired,
  resources: PropTypes.shape({
    query: PropTypes.object.isRequired,
    harvestable: PropTypes.shape({
      hasLoaded: PropTypes.bool.isRequired,
      records: PropTypes.arrayOf(
        PropTypes.shape({}).isRequired,
      ).isRequired,
    }).isRequired,
    oldLogs: PropTypes.shape({
      failed: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
          message: PropTypes.string.isRequired,
        })
      ]).isRequired,
      hasLoaded: PropTypes.bool.isRequired,
      records: PropTypes.arrayOf(
        PropTypes.object.isRequired,
      ),
      other: PropTypes.shape({
        totalRecords: PropTypes.number.isRequired,
      }),
    }),
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


export default stripesConnect(HarvestableOldLogsRoute);