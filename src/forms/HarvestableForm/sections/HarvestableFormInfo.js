import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Col, Row, TextField } from '@folio/stripes/components';

const HarvestableFormInfo = () => {
  return (
    <div data-test-harvestable-info id="HarvestableFormInfo">
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
  );
};

export default HarvestableFormInfo;
