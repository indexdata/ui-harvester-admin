import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col, Row, KeyValue, Accordion } from '@folio/stripes/components';


const StorageDetail = (props) => {
  const data = props.initialValues;

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
            label={<FormattedMessage id="ui-harvester-admin.storage.field.url" />}
            value={data.url}
          />
        </Col>
      </Row>
      {data.type === 'inventoryStorage' &&
        <Row>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-harvester-admin.storage.field.json" />}
              value={data.json}
            />
          </Col>
        </Row>
      }

      <Accordion
        id="storage-devinfo"
        label={<FormattedMessage id="ui-harvester-admin.accordion.devinfo" />}
        closedByDefault
      >
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      </Accordion>
    </>
  );
};


StorageDetail.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.string.isRequired,
    // See https://github.com/indexdata/mod-harvester-admin/blob/master/src/main/resources/openapi/schemas/storage.json
    // No properties seem to be mandatory
    // ESLint's dumb proptypes-checking thinks all fields are in initialValues, not resources.storage.record
    name: PropTypes.string,
    description: PropTypes.string,
    enabled: PropTypes.string, // "true" or "false"
    url: PropTypes.string,
    type: PropTypes.string,
    json: PropTypes.string,
    // Not used:
    // acl: string (readonly)
    // bulksize: string (deprecated)
    // currentStatus: string
    // customClass: string
  }).isRequired,
};


export default StorageDetail;
