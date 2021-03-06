import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { stripesConnect } from '@folio/stripes/core';
import HarvestableForm from '../forms/HarvestableForm';
import packageInfo from '../../package';
import { raw2cooked, cooked2raw } from '../util/cookData';


const EditHarvestableRoute = ({ resources, mutator, match }) => {
  const handleClose = () => {
    mutator.query.update({ _path: `${packageInfo.stripes.route}/harvestables/${match.params.recId}` });
  };

  const handleSubmit = (record) => {
    mutator.harvestable.PUT(cooked2raw(record))
      .then(handleClose);
  };

  const isLoading = (resources.harvestable.isPending ||
                     resources.transformationPipelines.isPending ||
                     resources.storageEngines.isPending);

  return (
    <HarvestableForm
      isLoading={isLoading}
      initialValues={raw2cooked(get(resources, 'harvestable.records[0]', {}))}
      data={{
        transformationPipelines: resources.transformationPipelines.records,
        storageEngines: resources.storageEngines.records,
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
  storageEngines: {
    type: 'okapi',
    path: 'harvester-admin/storages',
    records: 'storages',
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
    storageEngines: PropTypes.shape({
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
