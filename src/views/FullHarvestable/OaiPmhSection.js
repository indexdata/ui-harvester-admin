import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Accordion } from '@folio/stripes/components';
import { RCKV } from '../../components/CKV';

const OaiPmhSection = ({ rec }) => (
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
);

OaiPmhSection.propTypes = {
  rec: PropTypes.object.isRequired,
};

export default OaiPmhSection;
