import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import { Pane } from '@folio/stripes/components';
import FullHarvestable from '../views/FullHarvestable';
import packageInfo from '../../package';


const EditHarvestableRoute = ({ defaultWidth, resources, mutator }) => {
  return (
    <Pane
      dismissible
      onClose={() => mutator.query.update({ _path: `${packageInfo.stripes.route}/harvestables` })}
      defaultWidth={defaultWidth}
      paneTitle={resources.harvestable.records[0]?.name}
    >
      EDIT
      <FullHarvestable resource={resources.harvestable} />
    </Pane>
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
  defaultWidth: PropTypes.string,
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


EditHarvestableRoute.defaultProps = {
  defaultWidth: '60%',
};

export default stripesConnect(EditHarvestableRoute);
