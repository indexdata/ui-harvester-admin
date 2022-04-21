import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Accordion, Checkbox } from '@folio/stripes/components';
import { RCF } from '../../components/CF';

const HarvestableFormStatus = () => (
  <Accordion
    id="harvestable-form-status"
    label={<FormattedMessage id="ui-harvester-admin.harvestables.field.type.status" />}
  >
    <RCF tag="id" disabled />
    <RCF tag="name" />
    <RCF tag="scheduleString" />
    <RCF tag="usedBy" i18nTag="usageTags" />
    <RCF tag="managedBy" i18nTag="adminTags" />
    <RCF tag="enabled" i18nTag="statusJobEnabled" component={Checkbox} type="checkbox" />
    <RCF tag="mailAddress" i18nTag="customMailAddresses" />
  </Accordion>
);

export default HarvestableFormStatus;
