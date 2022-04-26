import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Accordion, Row, Col, TextField, Checkbox, TextArea, Select, Label, IconButton, Button } from '@folio/stripes/components';
import { RCF, CF } from '../../components/CF';

const logLevels = ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR'].map(x => ({ value: x, label: x }));
const mailLevels = ['OK', 'WARN', 'ERROR'].map(x => ({ value: x, label: x }));
const rawFailedRecords = ['NO_STORE', 'CLEAN_DIRECTORY', 'CREATE_OVERWRITE', 'ADD_ALL'];

const HarvestableFormGeneral = ({ data }) => {
  const intl = useIntl();
  const failedRecords = rawFailedRecords.map(x => ({
    value: x,
    label: x + ' - ' + intl.formatMessage({ id: `ui-harvester-admin.harvestables.field.failedRecordsLogging.${x}` }),
  }));

  const transformationPipelines = data.transformationPipelines.map(x => ({ value: x.id, label: x.name }));
  const storageEngines = data.storageEngines.map(x => ({ value: x.id, label: x.name }));

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
      <RCF tag="transformation.id" i18nTag="transformationPipeline" component={Select} dataOptions={transformationPipelines} />
      <RCF tag="laxParsing" component={Checkbox} type="checkbox" />
      <RCF tag="encoding" />
      <RCF tag="storage.id" i18nTag="storage.name" component={Select} dataOptions={storageEngines} />
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
      <Row>
        <Col xs={12}>
          <Label>
            <FormattedMessage id="ui-harvester-admin.harvestables.field.mailAddresses" />
          </Label>
          <FieldArray name="mailAddresses">
            {({ fields }) => (
              <>
                {fields.map((name, index) => (
                  <Row>
                    <Col xs={11}>
                      <Field name={name} component={TextField} />
                    </Col>
                    <Col xs={1}>
                      <IconButton icon="trash" onClick={() => fields.remove(index)} />
                    </Col>
                  </Row>
                ))}
                <Button onClick={() => fields.push('')}>
                  <FormattedMessage id="ui-harvester-admin.add" />
                </Button>
              </>
            )}
          </FieldArray>
        </Col>
      </Row>
      <RCF tag="mailLevel" component={Select} dataOptions={mailLevels} />
      <RCF tag="constantFields" />
      <RCF tag="json" component={TextArea} rows="6" />
    </Accordion>
  );
};

HarvestableFormGeneral.propTypes = {
  data: PropTypes.shape({
    transformationPipelines: PropTypes.arrayOf(
      PropTypes.shape({
        enabled: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    storageEngines: PropTypes.arrayOf(
      PropTypes.shape({
        enabled: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};

export default HarvestableFormGeneral;
