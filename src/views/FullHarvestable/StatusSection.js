import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Accordion, Row } from '@folio/stripes/components';
import { RCKV, CKV } from '../../components/CKV';

const StatusSection = ({ rec }) => (
  <Accordion
    id="harvestable-section-status"
    label={<FormattedMessage id="ui-harvester-admin.harvestables.field.type.status" />}
  >
    <Row>
      <CKV rec={rec} tag="id" xs={6} />
      <CKV rec={rec} tag="__jobClass" i18nTag="jobClass" xs={6} />
    </Row>
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
