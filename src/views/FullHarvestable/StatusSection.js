import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Accordion } from '@folio/stripes/components';
import { RCKV } from '../../components/CKV';

const StatusSection = ({ rec }) => (
  <Accordion
    id="full-harvester-status"
    label={<FormattedMessage id="ui-harvester-admin.harvestables.field.type.status" />}
  >
    <RCKV rec={rec} tag="type" />
    <RCKV rec={rec} tag="id" />
    <RCKV rec={rec} tag="name" />
    <RCKV rec={rec} tag="scheduleString" />
    <RCKV rec={rec} tag="usedBy" i18nTag="usageTags" />
    <RCKV rec={rec} tag="managedBy" i18nTag="adminTags" />
    <RCKV rec={rec} tag="enabled" i18nTag="statusJobEnabled" />
    <RCKV rec={rec} tag="mailAddress" i18nTag="customMailAddresses" />
  </Accordion>
);

StatusSection.propTypes = {
  rec: PropTypes.object.isRequired,
};

export default StatusSection;
