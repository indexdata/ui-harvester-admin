import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import { makeQueryFunction, StripesConnectedSource } from '@folio/stripes/smart-components';
import indexNames from '../search/oldLogsIndexNames';
import sortMap from '../search/oldLogsSortMap';
import filterConfig from '../search/oldLogsFilterConfig';
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


const queryFunction = makeQueryFunction(
  'cql.allRecords=1',
  indexNames
    .filter(n => n !== 'all' && n !== 'id' && n !== 'harvestableId' && n !== 'message' /* XXX for now */)
    .map(index => `${index}="%{query.query}*"`).join(' or '),
  sortMap,
  filterConfig,
);


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
      query: (queryParams, pathComponents, rv, logger) => {
        const extraFilter = `harvestableId.${pathComponents.recId}`;
        const allFilters = rv.query.filters ? `${rv.query.filters},${extraFilter}` : extraFilter;
        rv.query = { ...rv.query, filters: allFilters };
        return queryFunction(queryParams, pathComponents, rv, logger);
      }
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
