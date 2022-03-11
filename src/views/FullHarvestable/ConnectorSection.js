import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Accordion } from '@folio/stripes/components';
import { RCKV } from '../../components/CKV';

const ConnectorSection = ({ rec }) => (
  <Accordion
    id="full-harvester-connector"
    label={<FormattedMessage id="ui-harvester-admin.harvestables.field.type.connector" />}
  >
    <RCKV rec={rec} tag="connectorEngineUrlSetting.label" />
    <RCKV rec={rec} tag="engineParameters" />
    <RCKV rec={rec} tag="connectorRepoUrlSetting.label" />
    <RCKV rec={rec} tag="connector" />
    <RCKV rec={rec} tag="overwrite" />
    <RCKV rec={rec} tag="username" i18nTag="connuser" />
    <RCKV rec={rec} tag="password" />
    <RCKV rec={rec} tag="proxy" />
    <RCKV rec={rec} tag="initData" />
    <RCKV rec={rec} tag="fromDate" />
    <RCKV rec={rec} tag="untilDate" />
    <RCKV rec={rec} tag="resumptionToken" i18nTag="startToken" />
    <RCKV rec={rec} tag="sleep" />
    <RCKV rec={rec} tag="retryCount" i18nTag="failedRetryCount" />
    <RCKV rec={rec} tag="allowErrors" />
  </Accordion>
);

ConnectorSection.propTypes = {
  rec: PropTypes.object.isRequired,
};

export default ConnectorSection;
