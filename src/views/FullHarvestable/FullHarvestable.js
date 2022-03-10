import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Loading, Accordion, Row, Col, KeyValue } from '@folio/stripes/components';
import { CKV, RCKV } from '../../components/CKV';


const FullHarvestable = ({ resource }) => {
  if (!resource.hasLoaded) return <Loading />;
  const rec = resource.records[0];

  return (
    <>
      <Accordion
        id="full-harvester-general"
        label={<FormattedMessage id="ui-harvester-admin.harvestables.heading.general" />}
      >
        <RCKV rec={rec} tag="id" />
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
        <RCKV rec={rec} tag="transformationPipeline" />
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
        <RCKV rec={rec} tag="id" />
      </Accordion>

      <Accordion
        id="full-harvester-general"
        label={<FormattedMessage id="ui-harvester-admin.harvestables.field.type.oaiPmh" />}
      >
        <RCKV rec={rec} tag="type" />
        <RCKV rec={rec} tag="url" />
        <RCKV rec={rec} tag="oaiSetName" />
        <RCKV rec={rec} tag="metadataPrefix" />
        <RCKV rec={rec} tag="dateFormat" />
        <RCKV rec={rec} tag="fromDate" />
        <RCKV rec={rec} tag="untilDate" />
        <RCKV rec={rec} tag="resumptionToken" />
        <RCKV rec={rec} tag="clearRtOnError" />
        <RCKV rec={rec} tag="keepPartial" />
        <RCKV rec={rec} tag="retryCount" />
        <RCKV rec={rec} tag="retryWait" />
      </Accordion>

      <Accordion
        id="full-harvester-general"
        label={<FormattedMessage id="ui-harvester-admin.harvestables.heading.status" />}
      >
        <Row>
          <CKV rec={rec} tag="currentStatus" xs={4} />
          <CKV rec={rec} tag="initiallyHarvested" xs={8} />
        </Row>
        <Row>
          <CKV rec={rec} tag="lastHarvestStarted" xs={6} />
          <CKV rec={rec} tag="lastHarvestFinished" xs={6} />
        </Row>
        <RCKV rec={rec} tag="lastUpdated" />
      </Accordion>

      <Accordion
        id="full-harvester-devinfo"
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

FullHarvestable.propTypes = {
  resource: PropTypes.shape({
    hasLoaded: PropTypes.bool.isRequired,
    records: PropTypes.arrayOf(
      PropTypes.shape({
        json: PropTypes.string, // not required
        // ... and lots of other fields that ESLint doesn't care about
      }).isRequired,
    ),
  }).isRequired,
};

export default FullHarvestable;

/*
  // Not used
  "allowErrors": "false",
  "diskRun": "false",
  "harvestImmediately": "false",
  "overwrite": "false",
*/
