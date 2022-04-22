import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { stripesConnect } from '@folio/stripes/core';
import HarvestableForm from '../forms/HarvestableForm';
import { booleanFields } from '../constants';
import packageInfo from '../../package';


function getInitialValues(resources) {
  const values = get(resources, 'harvestable.records[0]', {});
  const massaged = { ...values };

  if (massaged.json && typeof massaged.json === 'object') {
    massaged.json = JSON.stringify(massaged.json, null, 2);
  }

  booleanFields.forEach(tag => {
    if (massaged[tag] !== undefined) {
      massaged[tag] = (massaged[tag] === 'true');
    }
  });

  return massaged;
}


const EditHarvestableRoute = ({ resources, mutator, match }) => {
  const handleClose = () => {
    mutator.query.update({ _path: `${packageInfo.stripes.route}/harvestables/${match.params.recId}` });
  };

  const handleSubmit = (record) => {
    const massaged = { ...record };

    booleanFields.forEach(tag => {
      if (massaged[tag] !== undefined) {
        massaged[tag] = massaged[tag] ? 'true' : 'false';
      }
    });

    mutator.harvestable.PUT(massaged)
      .then(handleClose);
  };

  const isLoading = (resources.harvestable.isPending ||
                     resources.transformationPipelines.isPending);

  return (
    <HarvestableForm
      isLoading={isLoading}
      initialValues={getInitialValues(resources)}
      data={{
        transformationPipelines: resources.transformationPipelines.records,
      }}
      handlers={{ onClose: handleClose }}
      onSubmit={handleSubmit}
    />
  );
};


EditHarvestableRoute.manifest = Object.freeze({
  query: {},
  harvestable: {
    type: 'okapi',
    path: 'harvester-admin/harvestables/:{recId}',
  },
  transformationPipelines: {
    type: 'okapi',
    path: 'harvester-admin/transformations',
    records: 'transformations',
  },
});


EditHarvestableRoute.propTypes = {
  resources: PropTypes.shape({
    harvestable: PropTypes.shape({
      isPending: PropTypes.bool.isRequired,
      records: PropTypes.arrayOf(
        PropTypes.shape({}).isRequired,
      ).isRequired,
    }).isRequired,
    transformationPipelines: PropTypes.shape({
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
    harvestable: PropTypes.shape({
      PUT: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};


export default stripesConnect(EditHarvestableRoute);
