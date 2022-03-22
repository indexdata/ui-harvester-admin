import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Accordion, Col, Row, TextField } from '@folio/stripes/components';

const RCF = ({ tag }) => (
  <Row>
    <Col xs={12}>
      <FormattedMessage id={`ui-harvester-admin.harvestables.field.${tag}`}>
        {placeholder => (
          <Field
            id={`edit-harvestable-${tag}`}
            name={tag}
            label={placeholder}
            component={TextField}
          />
        )}
      </FormattedMessage>
    </Col>
  </Row>
);

RCF.propTypes = {
  tag: PropTypes.string.isRequired,
};

const HarvestableFormGeneral = () => {
  return (
    <Accordion
      id="harvestable-form-general"
      label={<FormattedMessage id="ui-harvester-admin.harvestables.heading.general" />}
    >
      <RCF tag="id" />
      <RCF tag="name" />
    </Accordion>
  );
};

export default HarvestableFormGeneral;
