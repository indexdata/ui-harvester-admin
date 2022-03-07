import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import { Pane } from '@folio/stripes/components';

const FullHarvestableLoader = ({ recId, resources, mutator }) => (
  <Pane
    dismissible
    onClose={() => mutator.query.update({ recId: null })}
    defaultWidth="40%"
    paneTitle={`record ${recId}`}
  >
    <pre>
      {JSON.stringify(resources, null, 2)}
    </pre>
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
  recId: PropTypes.string.isRequired,
  resources: PropTypes.shape({}).isRequired,
  mutator: PropTypes.shape({
    query: PropTypes.shape({
      update: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

export default stripesConnect(FullHarvestableLoader);
