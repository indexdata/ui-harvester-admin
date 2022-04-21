import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Accordion, Checkbox, Datepicker, TextArea } from '@folio/stripes/components';
import { RCF } from '../../components/CF';

const HarvestableFormConnector = () => (
  <Accordion
    id="harvestable-form-connector"
    label={<FormattedMessage id="ui-harvester-admin.harvestables.field.type.connector" />}
  >
    <RCF tag="connectorEngineUrlSetting.label" />
    <RCF tag="engineParameters" />
    <RCF tag="connectorRepoUrlSetting.label" />
    <RCF tag="connector" />
    <RCF tag="overwrite" component={Checkbox} type="checkbox" />
    <RCF tag="username" i18nTag="connuser" />
    <RCF tag="password" />
    <RCF tag="proxy" />
    <RCF tag="initData" component={TextArea} rows="4" />
    <RCF tag="fromDate" component={Datepicker} />
    <RCF tag="untilDate" component={Datepicker} />
    <RCF tag="resumptionToken" i18nTag="startToken" />
    <RCF tag="sleep" type="number" />
    <RCF tag="retryCount" i18nTag="failedRetryCount" type="number" />
    <RCF tag="allowErrors" component={Checkbox} type="checkbox" />
  </Accordion>
);

export default HarvestableFormConnector;
