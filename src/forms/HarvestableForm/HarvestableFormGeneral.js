import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Accordion, Col, Row, TextField, TextArea } from '@folio/stripes/components';

const CF = ({ tag, i18nTag, xs, ...rest }) => (
  <Col xs={xs}>
    <FormattedMessage id={`ui-harvester-admin.harvestables.field.${i18nTag || tag}`}>
      {placeholder => (
        <Field
          id={`edit-harvestable-${tag}`}
          name={tag}
          label={placeholder}
          component={TextField}
          {...rest}
        />
      )}
    </FormattedMessage>
  </Col>
);

CF.propTypes = {
  tag: PropTypes.string.isRequired,
  i18nTag: PropTypes.string, // if defined, use this translation tag instead of `tag`
  xs: PropTypes.number.isRequired,
};

const RCF = (props) => (
  <Row>
    <CF {...props} xs={12} />
  </Row>
);

const HarvestableFormGeneral = () => {
  return (
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
      <RCF tag="openAccess" />
      <RCF tag="description" />
      <RCF tag="technicalNotes" />
      <RCF tag="contactNotes" />
      <RCF tag="enabled" />
      <RCF tag="scheduleString" />
      <RCF tag="transformationPipeline" />
      <RCF tag="laxParsing" />
      <RCF tag="encoding" />
      <RCF tag="storage.name" />
      <RCF tag="storageBatchLimit" />
      <RCF tag="cacheEnabled" />
      <RCF tag="storeOriginal" />
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
};

export default HarvestableFormGeneral;
