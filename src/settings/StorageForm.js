import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import arrayMutators from 'final-form-arrays';
import { Button, Pane, PaneFooter, Row, Checkbox, TextArea } from '@folio/stripes/components';
import { TitleManager } from '@folio/stripes/core';
import stripesFinalForm from '@folio/stripes/final-form';
import { isEqual } from 'lodash';
import setFieldData from 'final-form-set-field-data'; // XXX do we need this?
import { RCF, CF } from '../components/CF';


function validate(values) {
  const errors = {};
  const requiredTextMessage = <FormattedMessage id="ui-harvester-admin.fillIn" />;

  if (!values.name) {
    errors.name = requiredTextMessage;
  }

  return errors;
}


const StorageForm = (props) => {
  const { handleSubmit, onCancel, pristine, submitting } = props;

  function renderPaneFooter() {
    return (
      <PaneFooter
        renderStart={(
          <Button
            buttonStyle="default mega"
            id="clickable-cancel"
            marginBottom0
            onClick={onCancel}
          >
            <FormattedMessage id="stripes-components.cancel" />
          </Button>
        )}
        renderEnd={(
          <Button
            buttonStyle="primary mega"
            disabled={pristine || submitting}
            id="clickable-update-harvestable"
            marginBottom0
            onClick={handleSubmit}
            type="submit"
          >
            <FormattedMessage id="stripes-components.saveAndClose" />
          </Button>
        )}
      />
    );
  }

  const title = props.initialValues.name;

  return (
    <Pane
      centerContent
      defaultWidth="60%"
      footer={renderPaneFooter()}
      id="pane-harvestable-form"
      paneTitle={title}
    >
      <TitleManager record={title}>
        <form id="form-course">
          <Row>
            <CF tag="id" xs={3} disabled />
            <CF tag="name" xs={9} required />
          </Row>
          <RCF tag="description" component={TextArea} rows="4" />
          <RCF tag="enabled" component={Checkbox} type="checkbox" />
          <RCF tag="url" />
          <RCF tag="json" component={TextArea} rows="4" />
        </form>
      </TitleManager>
    </Pane>
  );
};


StorageForm.propTypes = {
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
})(StorageForm);
