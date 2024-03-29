import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Col, Row, KeyValue, MultiColumnList, Accordion } from '@folio/stripes/components';
import { bool2display } from './transformBooleans';


const PipelineDetail = (props) => {
  const stripes = useStripes();
  const data = props.initialValues;

  return (
    <>
      <Row>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-harvester-admin.pipeline.field.name" />}
            value={data.name}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-harvester-admin.pipeline.field.description" />}
            value={data.description}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-harvester-admin.pipeline.field.enabled" />}
            value={bool2display(data.enabled)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-harvester-admin.pipeline.field.parallel" />}
            value={bool2display(data.parallel)}
          />
        </Col>
      </Row>

      <h3><FormattedMessage id="ui-harvester-admin.settings.step" /></h3>
      <MultiColumnList
        visibleColumns={['position', 'name', 'in', 'out']}
        columnMapping={{
          position: <FormattedMessage id="ui-harvester-admin.pipeline.steps.position" />,
          name: <FormattedMessage id="ui-harvester-admin.pipeline.steps.name" />,
          in: <FormattedMessage id="ui-harvester-admin.pipeline.steps.in" />,
          out: <FormattedMessage id="ui-harvester-admin.pipeline.steps.out" />,
        }}
        contentData={data.stepAssociations}
        formatter={{
          name: r => r.step.name,
          in: r => r.step.inputFormat,
          out: r => r.step.outputFormat,
        }}
      />

      {stripes.config.showDevInfo &&
        <Accordion
          id="pipeline-devinfo"
          label={<FormattedMessage id="ui-harvester-admin.accordion.devinfo" />}
          closedByDefault
        >
          <pre>
            {JSON.stringify(data, null, 2)}
          </pre>
        </Accordion>
      }
    </>
  );
};


PipelineDetail.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.string.isRequired,
    // See https://github.com/indexdata/mod-harvester-admin/blob/master/src/main/resources/openapi/schemas/transformationGet.json
    // No properties seem to be mandatory
    name: PropTypes.string,
    description: PropTypes.string,
    enabled: PropTypes.bool,
    parallel: PropTypes.bool,
    stepAssociations: PropTypes.arrayOf(
      PropTypes.shape({
      }).isRequired,
    ),
  }).isRequired,
};


export default PipelineDetail;
