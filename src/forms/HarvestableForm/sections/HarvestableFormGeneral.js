import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Accordion, Col, Row, TextField } from '@folio/stripes/components';

const HarvestableFormGeneral = () => {
  return (
    <Accordion
      id="full-harvester-form-general"
      label={<FormattedMessage id="ui-harvester-admin.harvestables.heading.general" />}
    >
      <div data-test-harvestable-info id="HarvestableFormGeneral">
        <Row>
          <Col xs={4}>
            <FormattedMessage id="ui-harvester-admin.harvestables.field.id">
              {placeholder => (
                <Field
                  id="edit-harvestable-id"
                  name="id"
                  label={placeholder}
                  component={TextField}
                />
              )}
            </FormattedMessage>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <FormattedMessage id="ui-harvester-admin.harvestables.field.name">
              {placeholder => (
                <Field
                  id="edit-harvestable-name"
                  name="name"
                  label={placeholder}
                  component={TextField}
                />
              )}
            </FormattedMessage>
          </Col>
        </Row>
      </div>
    </Accordion>
  );
};

export default HarvestableFormGeneral;
