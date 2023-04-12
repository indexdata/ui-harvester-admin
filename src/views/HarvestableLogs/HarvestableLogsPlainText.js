import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Accordion, NoValue } from '@folio/stripes/components';


const HarvestableLogsPlainText = ({ harvestable, log }) => {
  let fileName;
  if (log) {
    const m = log.match(/Begin processing of (.*)/m);
    if (m) fileName = m[1];
  }

  const status = harvestable.currentStatus;
  const logStatus = status === 'RUNNING' ? 'running' : 'previous';
  const logLabel = (
    <>
      <FormattedMessage id={`ui-harvester-admin.logs.plainTextLog.${logStatus}`} />
      {fileName ? ` (${fileName})` : ''}
    </>
  );

  return (
    <Accordion
      id="harvestable-logs-plain"
      label={logLabel}
      closedByDefault
    >
      <pre>
        {log || <NoValue />}
      </pre>
    </Accordion>
  );
};


HarvestableLogsPlainText.propTypes = {
  harvestable: PropTypes.shape({
    message: PropTypes.string,
    currentStatus: PropTypes.string.isRequired,
  }).isRequired,
  log: PropTypes.string,
};


export default HarvestableLogsPlainText;
