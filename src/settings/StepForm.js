import React from 'react';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import arrayMutators from 'final-form-arrays';
import { Pane, Row, Col, Select, Checkbox, TextArea, Button } from '@folio/stripes/components';
import { TitleManager } from '@folio/stripes/core';
import stripesFinalForm from '@folio/stripes/final-form';
import { isEqual } from 'lodash';
import setFieldData from 'final-form-set-field-data'; // XXX do we need this?
import { RCF, CF } from '../components/CF';
import renderPaneFooter from './renderPaneFooter';
import ScriptOK from './ScriptOK';


function validate(values) {
  const errors = {};
  const requiredTextMessage = <FormattedMessage id="ui-harvester-admin.fillIn" />;
  const requiredSelectMessage = <FormattedMessage id="ui-harvester-admin.selectToContinue" />;

  if (!values.name) {
    errors.name = requiredTextMessage;
  }
  if (!values.type) {
    errors.type = requiredSelectMessage;
  }

  // XXX should validate XML as StorageForm.js does for JSON

  return errors;
}


const StepForm = (props) => {
  const { form, handleSubmit, onCancel, pristine, submitting } = props;
  const intl = useIntl();

  /*
  console.log('xform = ', form);
  console.log('getRegisteredFields =', form.getRegisteredFields());
  const getFieldState = form.getFieldState
  console.log('getFieldState = ', getFieldState);
  const scriptField = getFieldState('script');
  console.log('scriptField = ', form.scriptField);
  */

  const noValue = {
    value: '',
    label: intl.formatMessage({ id: 'ui-harvester-admin.selectValue' }),
  };
  const types = ['XmlTransformStep', 'CustomTransformStep'].map(x => ({ value: x, label: x }));
  const formats = ['XML', 'JSON', 'Other'].map(x => ({ value: x, label: x }));
  const ccXML2JSON = 'com.indexdata.masterkey.localindices.harvest.messaging.InstanceXmlToInstanceJsonTransformerRouter';

  const title = props.initialValues?.name;

  return (
    <Pane
      centerContent
      defaultWidth="60%"
      footer={renderPaneFooter(handleSubmit, onCancel, pristine, submitting)}
      id="pane-step-form"
      paneTitle={title}
    >
      <TitleManager record={title}>
        <form id="form-step">
          <Row>
            <CF tag="id" xs={2} disabled />
            <CF tag="type" domain="step" xs={2} component={Select} dataOptions={[noValue].concat(types)} required />
            <CF tag="name" xs={8} required />
          </Row>
          <RCF tag="description" domain="step" component={TextArea} rows="4" />
          <RCF tag="enabled" domain="storage" component={Checkbox} type="checkbox" />
          <Row>
            <CF tag="inputFormat" domain="step" xs={6} component={Select} dataOptions={[noValue].concat(formats)} required />
            <CF tag="outputFormat" domain="step" xs={6} component={Select} dataOptions={[noValue].concat(formats)} required />
          </Row>
          <RCF tag="script" domain="step" component={TextArea} rows="4" />
          <ScriptOK xslText={form.getState().values.script} />
          <RCF tag="testData" domain="step" component={TextArea} rows="4" />
          <RCF tag="testOutput" domain="step" component={TextArea} rows="4" />
          <Row>
            <CF tag="customClass" domain="step" xs={9} />
            <Col xs={3}>
              <div style={{ marginTop: '1.9em' }}>
                <Button marginBottom0 onClick={() => form.change('customClass', ccXML2JSON)}>
                  <FormattedMessage id="ui-harvester-admin.set-to-xml2json" />
                </Button>
              </div>
            </Col>
          </Row>
        </form>
      </TitleManager>
    </Pane>
  );
};


StepForm.propTypes = {
  form: PropTypes.shape({
    change: PropTypes.func.isRequired,
  }).isRequired,
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};


export default stripesFinalForm({
  initialValuesEqual: (a, b) => isEqual(a, b),
  validate,
  navigationCheck: true,
  subscription: {
    values: true,
  },
  mutators: { setFieldData, ...arrayMutators }
})(StepForm);
