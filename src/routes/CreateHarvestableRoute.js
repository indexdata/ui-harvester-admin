import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import HarvestableForm from '../forms/HarvestableForm';
import { cooked2raw } from '../util/cookData';
import packageInfo from '../../package';


const CreateHarvestableRoute = ({ resources, mutator, match, location }) => {
  const handleClose = () => {
    mutator.query.update({ _path: `${packageInfo.stripes.route}/harvestables/${location.search}` });
  };

  const handleSubmit = (record) => {
    mutator.harvestables.POST(cooked2raw(record))
      .then(handleClose);
  };

  const isLoading = (resources.transformationPipelines.isPending ||
                     resources.storageEngines.isPending);

  return (
    <HarvestableForm
      isLoading={isLoading}
      initialValues={{ type: match.params.type }}
      data={{
        transformationPipelines: resources.transformationPipelines.records,
        storageEngines: resources.storageEngines.records,
      }}
      handlers={{ onClose: handleClose }}
      onSubmit={handleSubmit}
    />
  );
};


CreateHarvestableRoute.manifest = Object.freeze({
  query: {},
  harvestables: {
    type: 'okapi',
    path: 'harvester-admin/harvestables',
    fetch: false,
    clientGeneratePk: false,
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


CreateHarvestableRoute.propTypes = {
  resources: PropTypes.shape({
    harvestables: PropTypes.shape({
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
    harvestables: PropTypes.shape({
      POST: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};


export default stripesConnect(CreateHarvestableRoute);
