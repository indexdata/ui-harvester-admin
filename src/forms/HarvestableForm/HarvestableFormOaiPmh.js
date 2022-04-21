import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Accordion, Row, Checkbox, Datepicker } from '@folio/stripes/components';
import { RCF, CF } from '../../components/CF';

const HarvestableFormOaiPmh = () => (
  <Accordion
    id="harvestable-form-oai"
    label={<FormattedMessage id="ui-harvester-admin.harvestables.field.type.oaiPmh" />}
  >
    <RCF tag="url" />
    <RCF tag="oaiSetName" />
    <RCF tag="metadataPrefix" />
    <RCF tag="dateFormat" />
    <Row>
      <CF tag="fromDate" xs={6} component={Datepicker} />
      <CF tag="untilDate" xs={6} component={Datepicker} />
    </Row>
    <RCF tag="resumptionToken" />
    <RCF tag="clearRtOnError" component={Checkbox} type="checkbox" />
    <RCF tag="keepPartial" component={Checkbox} type="checkbox" />
    <Row>
      <CF tag="retryCount" xs={6} />
      <CF tag="retryWait" xs={6} />
    </Row>
  </Accordion>
);

export default HarvestableFormOaiPmh;
