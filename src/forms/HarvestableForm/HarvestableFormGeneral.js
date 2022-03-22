import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Accordion, Col, Row, TextField } from '@folio/stripes/components';

const RCF = ({ fieldName }) => (
  <Row>
    <Col xs={12}>
      <FormattedMessage id={`ui-harvester-admin.harvestables.field.${fieldName}`}>
        {placeholder => (
          <Field
            id={`edit-harvestable-${fieldName}`}
            name={fieldName}
            label={placeholder}
            component={TextField}
          />
        )}
      </FormattedMessage>
    </Col>
  </Row>
);

RCF.propTypes = {
  fieldName: PropTypes.string.isRequired,
};

const HarvestableFormGeneral = () => {
  return (
    <Accordion
      id="harvestable-form-general"
      label={<FormattedMessage id="ui-harvester-admin.harvestables.heading.general" />}
    >
      <div data-test-harvestable-info id="HarvestableFormGeneral">
        <RCF fieldName="id" />
        <RCF fieldName="name" />
      </div>
    </Accordion>
  );
};

export default HarvestableFormGeneral;
