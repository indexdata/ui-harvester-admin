import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Accordion, Row, Col, Checkbox, Datepicker, Select } from '@folio/stripes/components';
import { RCF } from '../../components/CF';
import ListField from '../../components/ListField';

const outputSchemas = [
  { value: '', label: '[N/A]' },
  { value: 'application/marc', label: 'MARCXML standard' },
  { value: 'application/tmarc', label: 'TurboMARC' },
];

const HarvestableFormXmlBulk = () => (
  <Accordion
    id="harvestable-form-xml"
    label={<FormattedMessage id="ui-harvester-admin.harvestables.field.type.xmlBulk" />}
  >
    <Row>
      <Col xs={12}>
        <ListField
          name="url"
          label={<FormattedMessage id="ui-harvester-admin.harvestables.field.urls" />}
        />
      </Col>
    </Row>
    <RCF tag="allowErrors" component={Checkbox} type="checkbox" />
    <RCF tag="overwrite" component={Checkbox} type="checkbox" />
    <RCF tag="allowCondReq" component={Checkbox} type="checkbox" />
    <RCF tag="fromDate" i18nTag="initialFromDate" component={Datepicker} />
    <RCF tag="splitAt" type="number" />
    <RCF tag="splitSize" type="number" />
    <RCF tag="expectedSchema" />
    <RCF tag="outputSchema" component={Select} dataOptions={outputSchemas} />
    <RCF tag="recurse" component={Checkbox} type="checkbox" />
    <RCF tag="includeFilePattern" />
    <RCF tag="excludeFilePattern" />
    <RCF tag="passiveMode" component={Checkbox} type="checkbox" />
    <RCF tag="csvConfiguration" />
  </Accordion>
);

export default HarvestableFormXmlBulk;
