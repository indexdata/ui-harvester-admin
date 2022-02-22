import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import { makeQueryFunction, StripesConnectedSource } from '@folio/stripes/smart-components';
import Harvestables from '../views/Harvestables';


const INITIAL_RESULT_COUNT = 10;
const RESULT_COUNT_INCREMENT = 10;

const sortMap = {
  name: 'name',
  id: 'id',
  enabled: 'enabled',
  jobClass: 'jobClass',
  currentStatus: 'currentStatus',
};

const filterConfig = [];

const searchableIndexes = [
  'name',
  'id',
  'enabled',
  'jobClass',
  'currentStatus',
];


function HarvestablesRoute({ stripes, resources, mutator }) {
  let [source, setSource] = useState(); // eslint-disable-line prefer-const
  if (!source) {
    source = new StripesConnectedSource({ resources, mutator }, stripes.logger, 'reportTitles');
    setSource(source);
  } else {
    source.update({ resources, mutator }, 'reportTitles');
  }

  const handleNeedMoreData = () => source.fetchMore(RESULT_COUNT_INCREMENT);

  const error = resources.harvestables.failed ? resources.harvestables.failed.message : undefined;
  const hasLoaded = resources.harvestables.hasLoaded; // XXX may need to inspect .url instead

  return <Harvestables
    data={{
      harvestables: resources.harvestables.records,
    }}
    query={resources.query}
    source={source}
    mutator={mutator}
    error={error}
    hasLoaded={hasLoaded}
    onNeedMoreData={handleNeedMoreData}
  />;
}


HarvestablesRoute.manifest = Object.freeze({
  query: { initialValue: {} },
  resultCount: { initialValue: INITIAL_RESULT_COUNT },
  harvestables: {
    type: 'okapi',
    path: 'harvester-admin/harvestables',
    throwErrors: false,
    records: 'harvestables',
    recordsRequired: '%{resultCount}',
    perRequest: RESULT_COUNT_INCREMENT,
    params: {
      query: makeQueryFunction(
        'cql.allRecords=1',
        searchableIndexes.map(index => `${index}="%{query.query}*"`).join(' or '),
        sortMap,
        filterConfig,
      ),
    },
  },
});


HarvestablesRoute.propTypes = {
  stripes: PropTypes.shape({
    logger: PropTypes.object.isRequired,
  }).isRequired,
  resources: PropTypes.shape({
    query: PropTypes.object.isRequired,
    harvestables: PropTypes.shape({
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
    }),
  }).isRequired,
  mutator: PropTypes.object,
};


export default stripesConnect(HarvestablesRoute);
