import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import { Pane } from '@folio/stripes/components';
import FullHarvestable from '../views/FullHarvestable';

const FullHarvestableLoader = ({ defaultWidth, recId, resources, mutator }) => (
  <Pane
    dismissible
    onClose={() => mutator.query.update({ recId: null })}
    defaultWidth={defaultWidth}
    paneTitle={`record ${recId}`}
  >
    <FullHarvestable resource={resources.harvestable} />
  </Pane>
);

FullHarvestableLoader.manifest = Object.freeze({
  query: {},
  harvestable: {
    type: 'okapi',
    path: 'harvester-admin/harvestables/!{recId}',
  },
});

FullHarvestableLoader.propTypes = {
  defaultWidth: PropTypes.string.isRequired,
  recId: PropTypes.string.isRequired,
  resources: PropTypes.shape({
    harvestable: PropTypes.shape({}).isRequired,
  }).isRequired,
  mutator: PropTypes.shape({
    query: PropTypes.shape({
      update: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

export default stripesConnect(FullHarvestableLoader);
