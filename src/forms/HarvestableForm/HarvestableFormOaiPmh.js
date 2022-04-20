import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Accordion, Checkbox, Datepicker } from '@folio/stripes/components';
import { RCF } from '../../components/CF';

const HarvestableFormOaiPmh = () => (
  <Accordion
    id="harvestable-form-oai"
    label={<FormattedMessage id="ui-harvester-admin.harvestables.field.type.oaiPmh" />}
  >
    <RCF tag="url" />
    <RCF tag="oaiSetName" />
    <RCF tag="metadataPrefix" />
    <RCF tag="dateFormat" />
    <RCF tag="fromDate" component={Datepicker} />
    <RCF tag="untilDate" component={Datepicker} />
    <RCF tag="resumptionToken" />
    <RCF tag="clearRtOnError" component={Checkbox} type="checkbox" />
    <RCF tag="keepPartial" component={Checkbox} type="checkbox" />
    <RCF tag="retryCount" />
    <RCF tag="retryWait" />
  </Accordion>
);

export default HarvestableFormOaiPmh;
