import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Accordion, Row, Col, KeyValue } from '@folio/stripes/components';
import { RCKV, CKV } from '../../components/CKV';

const GeneralSection = ({ rec }) => (
  <Accordion
    id="harvestable-section-general"
    label={<FormattedMessage id="ui-harvester-admin.harvestables.heading.general" />}
  >
    <Row>
      <CKV rec={rec} tag="id" xs={6} />
      <CKV rec={rec} tag="__jobClass" i18nTag="jobClass" xs={6} />
    </Row>
    <RCKV rec={rec} tag="name" />
    <RCKV rec={rec} tag="serviceProvider" />
    <Row>
      <CKV rec={rec} tag="usedBy" xs={6} />
      <CKV rec={rec} tag="managedBy" xs={6} />
    </Row>
    <RCKV rec={rec} tag="openAccess" />
    <RCKV rec={rec} tag="description" />
    <RCKV rec={rec} tag="technicalNotes" />
    <RCKV rec={rec} tag="contactNotes" />
    <RCKV rec={rec} tag="enabled" />
    <RCKV rec={rec} tag="scheduleString" />
    <RCKV rec={rec} tag="transformation.name" i18nTag="transformationPipeline" />
    <RCKV rec={rec} tag="laxParsing" />
    <RCKV rec={rec} tag="encoding" />
    <RCKV rec={rec} tag="storage.name" />
    <RCKV rec={rec} tag="storageBatchLimit" />
    <RCKV rec={rec} tag="cacheEnabled" />
    <RCKV rec={rec} tag="storeOriginal" />
    <RCKV rec={rec} tag="recordLimit" />
    <RCKV rec={rec} tag="timeout" />
    <RCKV rec={rec} tag="logLevel" />
    <RCKV rec={rec} tag="failedRecordsLogging" />
    <RCKV rec={rec} tag="maxSavedFailedRecordsPerRun" />
    <RCKV rec={rec} tag="maxSavedFailedRecordsTotal" />
    <RCKV rec={rec} tag="mailAddress" />
    <RCKV rec={rec} tag="mailLevel" />
    <RCKV rec={rec} tag="constantFields" />
    <Row>
      <Col xs={12}>
        <KeyValue
          label={<FormattedMessage id="ui-harvester-admin.harvestables.field.json" />}
          value={<pre>{JSON.stringify(rec.json, null, 2)}</pre>}
        />
      </Col>
    </Row>
  </Accordion>
);

GeneralSection.propTypes = {
  rec: PropTypes.object.isRequired,
};

export default GeneralSection;
