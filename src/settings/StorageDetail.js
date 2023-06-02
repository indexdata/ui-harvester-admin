import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { stripesConnect } from '@folio/stripes/core';
import { Col, Row, KeyValue } from '@folio/stripes/components';

class StorageDetail extends React.Component {
  static propTypes = {
    initialValues: PropTypes.shape({
      // See https://github.com/indexdata/mod-harvester-admin/blob/master/src/main/resources/openapi/schemas/storage.json
      // No properties seem to be mandatory
      name: PropTypes.string,
      description: PropTypes.string,
      enabled: PropTypes.string, // "true" or "false"
      // acl: string (readonly)
      // id: string
      // url: string
      // json: string (only when type is 'inventoryStorage`, I think)
    }).isRequired,
  };

  render() {
    const data = this.props.initialValues;

    return (
      <>
        <Row>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-harvester-admin.storage.field.name" />}
              value={data.name}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-harvester-admin.storage.field.description" />}
              value={data.description}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-harvester-admin.storage.field.enabled" />}
              value={data.enabled}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-harvester-admin.accordion.devinfo" />}
              value={<pre>{JSON.stringify(data, null, 2)}</pre>}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default stripesConnect(StorageDetail);
