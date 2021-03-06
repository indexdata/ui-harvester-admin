import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Accordion } from '@folio/stripes/components';
import { RCKV } from '../../components/CKV';

const XmlBulkSection = ({ rec }) => (
  <Accordion
    id="harvestable-section-xml"
    label={<FormattedMessage id="ui-harvester-admin.harvestables.field.type.xmlBulk" />}
  >
    <RCKV rec={rec} tag="url" i18nTag="urls" />
    <RCKV rec={rec} tag="allowErrors" />
    <RCKV rec={rec} tag="overwrite" />
    <RCKV rec={rec} tag="allowCondReq" />
    <RCKV rec={rec} tag="fromDate" i18nTag="initialFromDate" />
    <RCKV rec={rec} tag="splitAt" />
    <RCKV rec={rec} tag="splitSize" />
    <RCKV rec={rec} tag="expectedSchema" />
    <RCKV rec={rec} tag="outputSchema" />
    <RCKV rec={rec} tag="recurse" />
    <RCKV rec={rec} tag="includeFilePattern" />
    <RCKV rec={rec} tag="excludeFilePattern" />
    <RCKV rec={rec} tag="passiveMode" />
    <RCKV rec={rec} tag="csvConfiguration" />
  </Accordion>
);

XmlBulkSection.propTypes = {
  rec: PropTypes.object.isRequired,
};

export default XmlBulkSection;
