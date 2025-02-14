import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import { StripesConnectedSource } from '@folio/stripes/smart-components';
import queryFunction from '../search/queryFunction';
import Records from '../views/Records';


const INITIAL_RESULT_COUNT = 100;
const RESULT_COUNT_INCREMENT = 100;


const RecordsRoute = ({ stripes, resources, mutator, children }) => {
  let [source, setSource] = useState(); // eslint-disable-line prefer-const
  if (!source) {
    source = new StripesConnectedSource({ resources, mutator }, stripes.logger, 'reportTitles');
    setSource(source);
  } else {
    source.update({ resources, mutator }, 'reportTitles');
  }

  const handleNeedMoreData = (_askAmount, index, _firstIndex, _direction) => {
    source.fetchOffset(index);
  };

  const hasLoaded = resources.records.hasLoaded;
  const error = resources.records.failed ? resources.records.failed.message : undefined;

  return (
    <Records
      data={{
        records: resources.records.records,
      }}
      resultCount={resources.records.other?.totalRecords}
      query={resources.query}
      updateQuery={mutator.query.update}
      hasLoaded={hasLoaded}
      error={error}
      pageAmount={RESULT_COUNT_INCREMENT}
      onNeedMoreData={handleNeedMoreData}
    >
      {children}
    </Records>
  );
};


RecordsRoute.manifest = Object.freeze({
  query: {},
  resultCount: { initialValue: INITIAL_RESULT_COUNT },
  resultOffset: { initialValue: 0 },
  records: {
    type: 'okapi',
    path: 'harvester-admin/previous-jobs/failed-records',
    throwErrors: false,
    records: 'failedRecords',
    recordsRequired: '%{resultCount}',
    resultOffset: '%{resultOffset}',
    perRequest: RESULT_COUNT_INCREMENT,
    resultDensity: 'sparse',
    accumulate: 'true',
    params: {
      // Modify the query-function to remove unwanted asterisks after ID searches
      query: (queryParams, pathComponents, rv, logger) => {
        const res = queryFunction('recordNumber="%{query.query}" or harvestableName="%{query.query}"',
          queryParams, pathComponents, rv, logger);
        if (res === undefined) return undefined;
        const m = res.match(/^(\(?(id|harvestableId)=\"[^\"]*)\*"(.*)$/);
        return m ? `${m[1]}\"${m[3]}` : res;
      }
    },
  },
});


RecordsRoute.propTypes = {
  stripes: PropTypes.shape({
    logger: PropTypes.object.isRequired,
  }).isRequired,
  resources: PropTypes.shape({
    query: PropTypes.object.isRequired,
    records: PropTypes.shape({
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
  children: PropTypes.object, // XXX may need to add .isRequired later
};


export default stripesConnect(RecordsRoute);
