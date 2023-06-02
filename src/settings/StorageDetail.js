import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { stripesConnect } from '@folio/stripes/core';
import { Col, Row, KeyValue, Accordion } from '@folio/stripes/components';


const StorageDetail = (props) => {
  let data = props.initialValues;
  if (props.resources.storage.hasLoaded) {
    data = props.resources.storage.records[0];
  } else {
    // Force a load of the full record
    props.mutator.storageId.replace(data.id);
  }

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
              value={<pre>{JSON.stringify(data.json, null, 2)}</pre>}
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
    json: PropTypes.object,
    // Not used:
    // acl: string (readonly)
    // bulksize: string (deprecated)
    // currentStatus: string
    // customClass: string
  }).isRequired,
  resources: PropTypes.shape({
    storage: PropTypes.shape({
      hasLoaded: PropTypes.bool.isRequired,
      records: PropTypes.arrayOf(
        PropTypes.shape({
          // See above: ESLint does not check this
        })
      ),
    }),
  }).isRequired,
  mutator: PropTypes.shape({
    storageId: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};


StorageDetail.manifest = Object.freeze({
  storageId: {
    initialValue: null,
  },
  storage: {
    type: 'okapi',
    path: 'harvester-admin/storages/%{storageId}',
  },
});


export default stripesConnect(StorageDetail);
