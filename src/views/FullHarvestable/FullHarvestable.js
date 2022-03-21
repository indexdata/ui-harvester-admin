import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Loading, Accordion } from '@folio/stripes/components';
import ErrorMessage from '../../components/ErrorMessage';
import GeneralSection from './GeneralSection';
import OaiPmhSection from './OaiPmhSection';
import XmlBulkSection from './XmlBulkSection';
import ConnectorSection from './ConnectorSection';
import StatusSection from './StatusSection';
import TrailerSection from './TrailerSection';


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
      {type !== 'status' && <TrailerSection rec={rec} />}

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
