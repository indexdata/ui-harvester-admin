import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Accordion, Checkbox, Datepicker } from '@folio/stripes/components';
import { RCF } from '../../components/CF';

const HarvestableFormXmlBulk = () => (
  <Accordion
    id="harvestable-form-xml"
    label={<FormattedMessage id="ui-harvester-admin.harvestables.field.type.xmlBulk" />}
  >
    <RCF tag="url" i18nTag="urls" />
    <RCF tag="allowErrors" component={Checkbox} type="checkbox" />
    <RCF tag="overwrite" component={Checkbox} type="checkbox" />
    <RCF tag="allowCondReq" component={Checkbox} type="checkbox" />
    <RCF tag="fromDate" i18nTag="initialFromDate" component={Datepicker} />
    <RCF tag="splitAt" type="number" />
    <RCF tag="splitSize" type="number" />
    <RCF tag="expectedSchema" />
    <RCF tag="outputSchema" />
    <RCF tag="recurse" component={Checkbox} type="checkbox" />
    <RCF tag="includeFilePattern" />
    <RCF tag="excludeFilePattern" />
    <RCF tag="passiveMode" component={Checkbox} type="checkbox" />
    <RCF tag="csvConfiguration" />
  </Accordion>
);

export default HarvestableFormXmlBulk;
