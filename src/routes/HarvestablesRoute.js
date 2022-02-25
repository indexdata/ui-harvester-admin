import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import { StripesConnectedSource, parseFilters } from '@folio/stripes/smart-components';
import Harvestables from '../views/Harvestables';


const INITIAL_RESULT_COUNT = 10;
const RESULT_COUNT_INCREMENT = 10;


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
    updateQuery={mutator.query.update}
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
      query: (qp, _pc, _rd, logger) => {
        const conditions = [];
        if (qp.query) conditions.push(`${qp.qindex || 'name'}=${qp.query}`);
        if (qp.filters) {
          const o = parseFilters(qp.filters);
          Object.keys(o).sort().forEach(key => {
            conditions.push(`${key}=${o[key][0]}`);
          });
        }

        if (conditions.length === 0) return undefined;
        const ret = conditions.join(' or '); // Not supported on back-end, but hey-ho
        logger.log('action', 'in query maker qp =', qp, '-->', ret);
        return ret;
      },
      orderBy: (qp, _pc, _rd, _logger, _props) => {
        return qp.sort;
      }
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
  mutator: PropTypes.shape({
    query: PropTypes.shape({
      update: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};


export default stripesConnect(HarvestablesRoute);