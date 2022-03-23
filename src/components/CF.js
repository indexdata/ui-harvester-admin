import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Row, Col, TextField } from '@folio/stripes/components';

export const CF = ({ tag, i18nTag, xs, ...rest }) => (
  <Col xs={xs}>
    <FormattedMessage id={`ui-harvester-admin.harvestables.field.${i18nTag || tag}`}>
      {placeholder => (
        <Field
          id={`edit-harvestable-${tag}`}
          name={tag}
          label={placeholder}
          component={TextField}
          {...rest}
        />
      )}
    </FormattedMessage>
  </Col>
);

CF.propTypes = {
  tag: PropTypes.string.isRequired,
  i18nTag: PropTypes.string, // if defined, use this translation tag instead of `tag`
  xs: PropTypes.number.isRequired,
};

export const RCF = (props) => (
  <Row>
    <CF {...props} xs={12} />
  </Row>
);
