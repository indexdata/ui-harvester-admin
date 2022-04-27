import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Accordion, Checkbox } from '@folio/stripes/components';
import { RCF, RCLF } from '../../components/CF';

const HarvestableFormStatus = () => (
  <Accordion
    id="harvestable-form-status"
    label={<FormattedMessage id="ui-harvester-admin.harvestables.field.type.status" />}
  >
    <RCF tag="id" disabled />
    <RCF tag="name" />
    <RCF tag="scheduleString" />
    <RCLF tag="usedBy" i18nTag="usageTags" />
    <RCLF tag="managedBy" i18nTag="adminTags" />
    <RCF tag="enabled" i18nTag="statusJobEnabled" component={Checkbox} type="checkbox" />
    <RCLF tag="mailAddress" i18nTag="customMailAddresses" />
  </Accordion>
);

export default HarvestableFormStatus;
