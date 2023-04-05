import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import { StripesConnectedSource } from '@folio/stripes/smart-components';
import queryFunction from '../search/oldJobsQueryFunction';
import OldJobs from '../views/OldJobs';
import packageInfo from '../../package';


const INITIAL_RESULT_COUNT = 100;
const RESULT_COUNT_INCREMENT = 100;


const HarvestableOldJobsRoute = ({ stripes, resources, mutator, match }) => {
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

  const hasLoaded = resources.harvestable.hasLoaded && resources.oldJobs.hasLoaded;
  const error = resources.oldJobs.failed ? resources.oldJobs.failed.message : undefined;

  return (
    <OldJobs
      data={{
        harvestable: resources.harvestable.records?.[0],
        oldJobs: resources.oldJobs.records,
      }}
      resultCount={resources.oldJobs.other?.totalRecords}
      query={resources.query}
      updateQuery={mutator.query.update}
      hasLoaded={hasLoaded}
      error={error}
      handlers={{ onClose: handleClose }}
      onNeedMoreData={handleNeedMoreData}
    />
  );
};


HarvestableOldJobsRoute.manifest = Object.freeze({
  query: {},
  resultCount: { initialValue: INITIAL_RESULT_COUNT },
  harvestable: {
    type: 'okapi',
    path: 'harvester-admin/harvestables/:{recId}',
  },
  oldJobs: {
    type: 'okapi',
    path: 'harvester-admin/previous-jobs',
    throwErrors: false,
    records: 'previousJobs',
    recordsRequired: '%{resultCount}',
    perRequest: RESULT_COUNT_INCREMENT,
    params: {
      // Curry the query-function to inject an extra filter specifying which harvestables's jobs we want
      query: (queryParams, pathComponents, rv, logger) => {
        const extraFilter = `harvestableId.${pathComponents.recId}`;
        const allFilters = rv.query.filters ? `${rv.query.filters},${extraFilter}` : extraFilter;
        rv.query = { ...rv.query, filters: allFilters };
        return queryFunction(queryParams, pathComponents, rv, logger);
      }
    },
  },
});


HarvestableOldJobsRoute.propTypes = {
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
    oldJobs: PropTypes.shape({
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


export default stripesConnect(HarvestableOldJobsRoute);
