import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import { StripesConnectedSource } from '@folio/stripes/smart-components';
import queryFunction from '../search/oldLogsQueryFunction';
import HarvestableOldLogs from '../views/HarvestableOldLogs';


const INITIAL_RESULT_COUNT = 100;
const RESULT_COUNT_INCREMENT = 100;


const AllOldLogsRoute = ({ stripes, resources, mutator }) => {
  let [source, setSource] = useState(); // eslint-disable-line prefer-const
  if (!source) {
    source = new StripesConnectedSource({ resources, mutator }, stripes.logger, 'reportTitles');
    setSource(source);
  } else {
    source.update({ resources, mutator }, 'reportTitles');
  }

  const handleNeedMoreData = () => source.fetchMore(RESULT_COUNT_INCREMENT);

  const hasLoaded = resources.oldLogs.hasLoaded;
  const error = resources.oldLogs.failed ? resources.oldLogs.failed.message : undefined;

  return (
    <HarvestableOldLogs
      data={{
        oldLogs: resources.oldLogs.records,
      }}
      resultCount={resources.oldLogs.other?.totalRecords}
      query={resources.query}
      updateQuery={mutator.query.update}
      hasLoaded={hasLoaded}
      error={error}
      onNeedMoreData={handleNeedMoreData}
    />
  );
};


AllOldLogsRoute.manifest = Object.freeze({
  query: {},
  resultCount: { initialValue: INITIAL_RESULT_COUNT },
  oldLogs: {
    type: 'okapi',
    path: 'harvester-admin/previous-jobs',
    throwErrors: false,
    records: 'previousJobs',
    recordsRequired: '%{resultCount}',
    perRequest: RESULT_COUNT_INCREMENT,
    params: {
      query: queryFunction,
    },
  },
});


AllOldLogsRoute.propTypes = {
  stripes: PropTypes.shape({
    logger: PropTypes.object.isRequired,
  }).isRequired,
  resources: PropTypes.shape({
    query: PropTypes.object.isRequired,
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
};


export default stripesConnect(AllOldLogsRoute);
