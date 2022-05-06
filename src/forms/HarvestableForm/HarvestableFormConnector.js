import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Accordion, Row, Checkbox, Datepicker, TextArea } from '@folio/stripes/components';
import { RCF, CF } from '../../components/CF';

const HarvestableFormConnector = () => (
  <Accordion
    id="harvestable-form-connector"
    label={<FormattedMessage id="ui-harvester-admin.harvestables.field.type.connector" />}
  >
    <RCF tag="connectorEngineUrlSetting.label" />
    <RCF tag="engineParameters" />
    <RCF tag="connectorRepoUrlSetting.label" />
    <RCF tag="connector" />
    <RCF tag="overwrite" helpTag="overwrite-connector" component={Checkbox} type="checkbox" />
    <Row>
      <CF tag="username" xs={6} i18nTag="connuser" />
      <CF tag="password" xs={6} />
    </Row>
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
