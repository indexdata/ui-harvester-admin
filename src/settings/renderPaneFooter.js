import React from 'react';
import { Button, PaneFooter } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';


function renderPaneFooter(handleSubmit, onCancel, pristine, submitting) {
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


export default renderPaneFooter;
