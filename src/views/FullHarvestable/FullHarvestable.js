import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { CalloutContext, IfPermission } from '@folio/stripes/core';
import { Loading, Pane, Accordion, Button, Icon, ConfirmationModal } from '@folio/stripes/components';
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


const FullHarvestableContent = ({ rec }) => {
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
  rec: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
};


const FullHarvestable = ({ defaultWidth, resources, mutator, match, deleteRecord }) => {
  const [deleting, setDeleting] = useState(false);
  const callout = useContext(CalloutContext);

  const resource = resources.harvestable;
  if (!resource.hasLoaded) return <Loading />;
  const rec = resource.records[0];

  const returnToList = () => mutator.query.update({ _path: `${packageInfo.stripes.route}/harvestables` });

  function maybeDeleteRecord(e) {
    e.stopPropagation();
    setDeleting(true);
  }

  function actuallyDeleteRecord() {
    deleteRecord().then(() => {
      returnToList();
      setDeleting(false);
      callout.sendCallout({
        message: (
          <FormattedMessage
            id="ui-harvester-admin.op.delete.completed"
            values={{
              name: rec.name,
              b: text => <b>{text}</b>,
            }}
          />
        ),
      });
    });
  }

  const actionMenu = () => {
    return (
      <>
        <IfPermission perm="harvester-admin.harvestables.item.put">
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
        </IfPermission>
        <IfPermission perm="harvester-admin.harvestables.item.delete">
          <Button
            buttonStyle="dropdownItem"
            data-test-actions-menu-delete
            id="clickable-delete-harvestable"
            onClick={maybeDeleteRecord}
          >
            <Icon icon="trash">
              <FormattedMessage id="ui-harvester-admin.button.delete" />
            </Icon>
          </Button>
        </IfPermission>
        <IfPermission perm="harvester-admin.run-jobs">
          <Button
            buttonStyle="dropdownItem"
            marginBottom0
            id="clickable-start-job"
          >
            <Icon icon="play">
              <FormattedMessage id="ui-harvester-admin.button.start-job" />
            </Icon>
          </Button>
        </IfPermission>
        <IfPermission perm="harvester-admin.stop-jobs">
          <Button
            buttonStyle="dropdownItem"
            marginBottom0
            id="clickable-stop-job"
          >
            <Icon icon="times-circle-solid">
              <FormattedMessage id="ui-harvester-admin.button.stop-job" />
            </Icon>
          </Button>
        </IfPermission>
      </>
    );
  };

  return (
    <Pane
      dismissible
      onClose={returnToList}
      defaultWidth={defaultWidth}
      paneTitle={resource.records[0]?.name}
      actionMenu={actionMenu}
    >
      <FullHarvestableContent rec={rec} />
      {deleting &&
        <ConfirmationModal
          open
          heading={<FormattedMessage id="ui-harvester-admin.op.delete.confirm" />}
          message={rec.name}
          confirmLabel={<FormattedMessage id="ui-harvester-admin.button.confirm" />}
          onConfirm={() => actuallyDeleteRecord()}
          onCancel={() => setDeleting(false)}
        />
      }
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
  }).isRequired,
  deleteRecord: PropTypes.func.isRequired,
};

export default FullHarvestable;
