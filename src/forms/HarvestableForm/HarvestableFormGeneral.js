import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Accordion, Row, Checkbox, TextArea, Select } from '@folio/stripes/components';
import { RCF, CF } from '../../components/CF';

const logLevels = ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR'].map(x => ({ value: x, label: x }));
const mailLevels = ['OK', 'WARN', 'ERROR'].map(x => ({ value: x, label: x }));
const rawFailedRecords = ['NO_STORE', 'CLEAN_DIRECTORY', 'CREATE_OVERWRITE', 'ADD_ALL'];

const HarvestableFormGeneral = () => {
  const intl = useIntl();
  const failedRecords = rawFailedRecords.map(x => ({
    value: x,
    label: x + ' - ' + intl.formatMessage({ id: `ui-harvester-admin.harvestables.field.failedRecordsLogging.${x}` }),
  }));

  return (
    <Accordion
      id="harvestable-form-general"
      label={<FormattedMessage id="ui-harvester-admin.harvestables.heading.general" />}
    >
      <Row>
        <CF tag="id" xs={2} disabled />
        <CF tag="name" xs={6} />
        <CF tag="serviceProvider" xs={4} />
      </Row>
      <Row>
        <CF tag="usedBy" xs={6} />
        <CF tag="managedBy" xs={6} />
      </Row>
      <RCF tag="openAccess" component={Checkbox} type="checkbox" />
      <RCF tag="description" component={TextArea} rows="4" />
      <Row>
        <CF tag="technicalNotes" xs={6} component={TextArea} rows="4" />
        <CF tag="contactNotes" xs={6} component={TextArea} rows="4" />
      </Row>
      <Row>
        <CF tag="enabled" xs={4} component={Checkbox} type="checkbox" />
        <CF tag="scheduleString" xs={8} />
      </Row>
      <RCF tag="transformationPipeline" />
      <RCF tag="laxParsing" component={Checkbox} type="checkbox" />
      <RCF tag="encoding" />
      <RCF tag="storage.name" />
      <RCF tag="storageBatchLimit" />
      <Row>
        <CF tag="cacheEnabled" xs={6} component={Checkbox} type="checkbox" />
        <CF tag="storeOriginal" xs={6} component={Checkbox} type="checkbox" />
      </Row>
      <RCF tag="recordLimit" />
      <RCF tag="timeout" />
      <RCF tag="logLevel" component={Select} dataOptions={logLevels} />
      <RCF tag="failedRecordsLogging" component={Select} dataOptions={failedRecords} />
      <Row>
        <CF tag="maxSavedFailedRecordsPerRun" xs={6} type="number" />
        <CF tag="maxSavedFailedRecordsTotal" xs={6} type="number" />
      </Row>
      <RCF tag="mailAddress" />
      <RCF tag="mailLevel" component={Select} dataOptions={mailLevels} />
      <RCF tag="constantFields" />
      <RCF tag="json" component={TextArea} rows="6" />
    </Accordion>
  );
};

export default HarvestableFormGeneral;
