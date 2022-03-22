import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  HasCommand,
  Button,
  LoadingPane,
  Pane,
  PaneFooter,
  checkScope
} from '@folio/stripes/components';
import { AppIcon, TitleManager, withStripes } from '@folio/stripes/core';
import stripesFinalForm from '@folio/stripes/final-form';
import { isEqual } from 'lodash';
import setFieldData from 'final-form-set-field-data'; // XXX do we need this?
import HarvestableFormGeneral from './HarvestableFormGeneral';

const handleKeyCommand = (handler, { disabled } = {}) => {
  return (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!disabled) {
      handler();
    }
  };
};

class HarvestableForm extends React.Component {
  static propTypes = {
    handlers: PropTypes.PropTypes.shape({
      onClose: PropTypes.func.isRequired,
    }),
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    form: PropTypes.object,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    values: PropTypes.object,
    stripes: PropTypes.shape({
      config: PropTypes.shape({
        showDevInfo: PropTypes.bool,
      }).isRequired,
    }).isRequired,
  }

  renderPaneFooter() {
    const {
      handlers,
      handleSubmit,
      pristine,
      submitting,
    } = this.props;

    return (
      <PaneFooter
        renderStart={(
          <Button
            buttonStyle="default mega"
            id="clickable-cancel"
            marginBottom0
            onClick={handlers.onClose}
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

  render() {
    const {
      isLoading,
      handlers,
      handleSubmit,
      form: { mutators },
      values = {},
      pristine,
      submitting
    } = this.props;
    if (isLoading) return <LoadingPane />;

    const title = values.name;

    // XXX We probably don't need to pass this
    const sectionProps = { handlers, mutators, values };

    const shortcuts = [
      {
        name: 'save',
        handler: handleKeyCommand(handleSubmit, { disabled: pristine || submitting }),
      },
      {
        name: 'cancel',
        shortcut: 'esc',
        handler: handleKeyCommand(handlers.onClose),
      },
    ];

    return (
      <HasCommand commands={shortcuts} isWithinScope={checkScope} scope={document.body}>
        <Pane
          appIcon={<AppIcon app="harvester-admin" />}
          centerContent
          defaultWidth="60%"
          footer={this.renderPaneFooter()}
          id="pane-harvestable-form"
          paneTitle={title}
          dismissible
          onClose={handlers.onClose}
        >
          <TitleManager record={title}>
            <form id="form-course">
              <HarvestableFormGeneral {...sectionProps} />
            </form>
          </TitleManager>
        </Pane>
      </HasCommand>
    );
  }
}

export default withStripes(stripesFinalForm({
  initialValuesEqual: (a, b) => isEqual(a, b),
  navigationCheck: true,
  subscription: {
    values: true,
  },
  mutators: { setFieldData }
})(HarvestableForm));
