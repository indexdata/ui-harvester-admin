import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Row, Col, TextField, Label, IconButton, Button } from '@folio/stripes/components';

const ListField = ({ name, label, component, emptyValue }) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      <FieldArray name={name}>
        {({ fields }) => (
          <>
            {fields.map((subname, index) => (
              <Row>
                <Col xs={11}>
                  <Field name={subname} component={component || TextField} />
                </Col>
                <Col xs={1}>
                  <IconButton icon="trash" onClick={() => fields.remove(index)} />
                </Col>
              </Row>
            ))}
            <Button onClick={() => fields.push(emptyValue || '')}>
              <FormattedMessage id="ui-harvester-admin.add" />
            </Button>
          </>
        )}
      </FieldArray>
    </>
  );
};

ListField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string, // probably wrong
  component: PropTypes.string, // definitely wrong
  emptyValue: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

export default ListField;
