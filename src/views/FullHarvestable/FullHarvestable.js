import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Loading, Accordion, Row } from '@folio/stripes/components';
import { CKV, RCKV } from '../../components/CKV';
import ErrorMessage from '../../components/ErrorMessage';
import GeneralSection from './GeneralSection';
import OaiPmhSection from './OaiPmhSection';
import XmlBulkSection from './XmlBulkSection';
import ConnectorSection from './ConnectorSection';
import StatusSection from './StatusSection';


const specificSections = {
  oaiPmh: OaiPmhSection,
  xmlBulk: XmlBulkSection,
  connector: ConnectorSection,
  status: StatusSection,
};


const FullHarvestable = ({ resource }) => {
  if (!resource.hasLoaded) return <Loading />;
  const rec = resource.records[0];
  const type = rec.type;
  const ErrorSection = () => <ErrorMessage message={`Unknown type '${type}'`} />;
  const SpecificSection = specificSections[type] || ErrorSection;

  return (
    <>
      {type !== 'status' && <GeneralSection rec={rec} />}

      <SpecificSection rec={rec} />

      {type !== 'status' &&
        <Accordion
          id="full-harvester-general"
          label={<FormattedMessage id="ui-harvester-admin.harvestables.heading.status" />}
        >
          <Row>
            <CKV rec={rec} tag="currentStatus" xs={6} />
            <CKV rec={rec} tag="initiallyHarvested" xs={6} />
          </Row>
          <Row>
            <CKV rec={rec} tag="lastHarvestStarted" xs={6} />
            <CKV rec={rec} tag="lastHarvestFinished" xs={6} />
          </Row>
          <RCKV rec={rec} tag="lastUpdated" />
        </Accordion>
      }

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
        type: PropTypes.string.isRequired,
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
