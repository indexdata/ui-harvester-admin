import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import { Pane } from '@folio/stripes/components';
import FullHarvestable from '../views/FullHarvestable';

const FullHarvestableLoader = ({ defaultWidth, resources, mutator }) => (
  <Pane
    dismissible
    onClose={() => mutator.query.update({ recId: null })}
    defaultWidth={defaultWidth}
    paneTitle={resources.harvestable.records[0]?.name}
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
  // recId: PropTypes.string.isRequired, // used only in manifest as !{recId}
  resources: PropTypes.shape({
    harvestable: PropTypes.shape({
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
  }).isRequired,
};

export default stripesConnect(FullHarvestableLoader);