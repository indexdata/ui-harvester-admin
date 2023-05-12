import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Accordion, NoValue, Button, Icon } from '@folio/stripes/components';


const HarvestableLogPlainText = ({ record, log, refreshLog }) => {
  let fileName;
  if (log) {
    const m = log.match(/Begin processing of (.*)/m);
    if (m) fileName = m[1];
  }

  const status = record.currentStatus;
  const logStatus = status === 'RUNNING' ? 'running' : 'previous';
  const logLabel = (
    <>
      <FormattedMessage id={`ui-harvester-admin.logs.plainTextLog.${logStatus}`} />
      {fileName ? ` (${fileName})` : ''}
    </>
  );

  return (
    <Accordion
      id="logs-plain"
      label={logLabel}
      closedByDefault
    >
      <br />
      <Button
        data-test-refresh-logs
        id="clickable-refresh-logs"
        marginBottom0
        onClick={refreshLog}
      >
        <Icon icon="refresh">
          <FormattedMessage id="ui-harvester-admin.logs.plainTextLog.refresh" />
        </Icon>
      </Button>

      <pre>
        {log || <NoValue />}
      </pre>
    </Accordion>
  );
};


HarvestableLogPlainText.propTypes = {
  record: PropTypes.shape({
    message: PropTypes.string,
    currentStatus: PropTypes.string, // .isRequired for harvestable, not for previous-job
  }).isRequired,
  log: PropTypes.string,
  refreshLog: PropTypes.func.isRequired,
};


export default HarvestableLogPlainText;
