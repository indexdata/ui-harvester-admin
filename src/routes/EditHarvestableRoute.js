import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { stripesConnect } from '@folio/stripes/core';
import HarvestableForm from '../forms/HarvestableForm';
import packageInfo from '../../package';


const EditHarvestableRoute = ({ resources, mutator, match }) => {
  const handleClose = () => {
    mutator.query.update({ _path: `${packageInfo.stripes.route}/harvestables/${match.params.recId}` });
  };

  const handleSubmit = (harvestable) => {
    mutator.harvestable.PUT(harvestable)
      .then(handleClose);
  };

  const initialValues = get(resources, 'harvestable.records[0]', {});
  const massaged = { ...initialValues };
  if (massaged.json && typeof massaged.json === 'object') {
    massaged.json = JSON.stringify(massaged.json, null, 2);
  }

  return (
    <HarvestableForm
      isLoading={resources.harvestable.isPending}
      initialValues={massaged}
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
});


EditHarvestableRoute.propTypes = {
  resources: PropTypes.shape({
    harvestable: PropTypes.shape({
      isPending: PropTypes.bool.isRequired,
      records: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
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
