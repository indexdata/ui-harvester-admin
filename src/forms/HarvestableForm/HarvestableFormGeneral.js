import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Accordion, Row, Checkbox, TextArea } from '@folio/stripes/components';
import { RCF, CF } from '../../components/CF';

const HarvestableFormGeneral = () => (
  <Accordion
    id="harvestable-form-general"
    label={<FormattedMessage id="ui-harvester-admin.harvestables.heading.general" />}
  >
    <RCF tag="id" />
    <RCF tag="name" />
    <RCF tag="serviceProvider" />
    <Row>
      <CF tag="usedBy" xs={6} />
      <CF tag="managedBy" xs={6} />
    </Row>
    <RCF tag="openAccess" component={Checkbox} type="checkbox" />
    <RCF tag="description" />
    <RCF tag="technicalNotes" />
    <RCF tag="contactNotes" />
    <RCF tag="enabled" component={Checkbox} type="checkbox" />
    <RCF tag="scheduleString" />
    <RCF tag="transformationPipeline" />
    <RCF tag="laxParsing" component={Checkbox} type="checkbox" />
    <RCF tag="encoding" />
    <RCF tag="storage.name" />
    <RCF tag="storageBatchLimit" />
    <RCF tag="cacheEnabled" component={Checkbox} type="checkbox" />
    <RCF tag="storeOriginal" component={Checkbox} type="checkbox" />
    <RCF tag="recordLimit" />
    <RCF tag="timeout" />
    <RCF tag="logLevel" />
    <RCF tag="failedRecordsLogging" />
    <RCF tag="maxSavedFailedRecordsPerRun" />
    <RCF tag="maxSavedFailedRecordsTotal" />
    <RCF tag="mailAddress" />
    <RCF tag="mailLevel" />
    <RCF tag="constantFields" />
    <RCF tag="json" component={TextArea} rows="6" />
  </Accordion>
);

export default HarvestableFormGeneral;
