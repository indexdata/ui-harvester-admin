import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Loading, Pane, Accordion, Button, Icon } from '@folio/stripes/components';
import ErrorMessage from '../../components/ErrorMessage';
import GeneralSection from './GeneralSection';
import OaiPmhSection from './OaiPmhSection';
import XmlBulkSection from './XmlBulkSection';
import ConnectorSection from './ConnectorSection';
import StatusSection from './StatusSection';
import TrailerSection from './TrailerSection';
import packageInfo from '../../../package';


const specificSections = {
  oaiPmh: OaiPmhSection,
  xmlBulk: XmlBulkSection,
  connector: ConnectorSection,
  status: StatusSection,
};


const FullHarvestableContent = ({ resource }) => {
  const rec = resource.records[0];
  const type = rec.type;
  const ErrorSection = () => <ErrorMessage message={`Unknown type '${type}'`} />;
  const SpecificSection = specificSections[type] || ErrorSection;

  return (
    <>
      {type !== 'status' && <GeneralSection rec={rec} />}
      <SpecificSection rec={rec} />
      {type !== 'status' && <TrailerSection rec={rec} />}

      <Accordion
        id="harvestable-section-devinfo"
        label={<FormattedMessage id="ui-harvester-admin.accordion.devinfo" />}
        closedByDefault
      >
        <pre>
          {JSON.stringify(rec, null, 2)}
        </pre>
      </Accordion>
    </>
  );
};


FullHarvestableContent.propTypes = {
  resource: PropTypes.shape({
    records: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};


const FullHarvestable = ({ defaultWidth, resources, mutator, match }) => {
  const stripes = useStripes();
  const resource = resources.harvestable;

  if (!resource.hasLoaded) return <Loading />;

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
      paneTitle={resource.records[0]?.name}
      actionMenu={actionMenu}
    >
      <FullHarvestableContent resource={resource} />
    </Pane>
  );
};


FullHarvestable.propTypes = {
  defaultWidth: PropTypes.string,
  resources: PropTypes.shape({
    harvestable: PropTypes.shape({
      hasLoaded: PropTypes.bool.isRequired,
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

export default FullHarvestable;
