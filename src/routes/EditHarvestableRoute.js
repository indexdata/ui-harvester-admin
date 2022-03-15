import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStripes, stripesConnect } from '@folio/stripes/core';
import { Pane, Button, Icon } from '@folio/stripes/components';
import FullHarvestable from '../views/FullHarvestable';
import packageInfo from '../../package';


const EditHarvestableRoute = ({ defaultWidth, resources, mutator, match }) => {
  const stripes = useStripes();
  const actionMenu = () => {
    if (!stripes.hasPerm('harvester-admin.harvestables.item.put')) return undefined;
    return (
      <Button
        buttonStyle="dropdownItem"
        data-test-actions-menu-edit
        id="clickable-edit-harvestable"
        onClick={() => {
          mutator.query.update({ _path: `${packageInfo.stripes.route}/harvestables/${match.params.recId}/edit` });
        }}
      >
        <Icon icon="edit">
          <FormattedMessage id="ui-harvester-admin.button.edit" />
        </Icon>
      </Button>
    );
  };

  return (
    <Pane
      dismissible
      onClose={() => mutator.query.update({ _path: `${packageInfo.stripes.route}/harvestables` })}
      defaultWidth={defaultWidth}
      paneTitle={resources.harvestable.records[0]?.name}
      actionMenu={actionMenu}
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      recId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired
};


EditHarvestableRoute.defaultProps = {
  defaultWidth: '60%',
};

export default stripesConnect(EditHarvestableRoute);
