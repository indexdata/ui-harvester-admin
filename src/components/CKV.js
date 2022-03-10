import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col, KeyValue } from '@folio/stripes/components';

export const CKV = ({ rec, tag, xs }) => (
  <Col xs={xs}>
    <KeyValue label={<FormattedMessage id={`ui-harvester-admin.harvestables.field.${tag}`} />} value={rec[tag]} />
  </Col>
);

CKV.propTypes = {
  rec: PropTypes.object.isRequired,
  tag: PropTypes.string.isRequired,
  xs: PropTypes.number.isRequired,
};

export const RCKV = (props) => (
  <Row>
    <CKV {...props} xs={12} />
  </Row>
);
