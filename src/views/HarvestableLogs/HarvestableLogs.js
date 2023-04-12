import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { HasCommand, LoadingPane, Pane, checkScope, Accordion, NoValue } from '@folio/stripes/components';
import { AppIcon, TitleManager } from '@folio/stripes/core';
import formatDateTime from '../../util/formatDateTime';
import HarvestableLogsHeader from './HarvestableLogsHeader';
import HarvestableLogsFailedRecords from './HarvestableLogsFailedRecords';
import css from '../Harvestables.css';


const handleKeyCommand = (handler, { disabled } = {}) => {
  return (e) => {
    if (e) e.preventDefault();
    if (!disabled) handler();
  };
};


const HarvestableLogs = (props) => {
  const {
    isLoading,
    data,
    handlers,
  } = props;

  const harvestable = data.harvestable[0];
  if (isLoading || !harvestable) return <LoadingPane />;
  const title = harvestable.name;
  const status = harvestable.currentStatus;

  const shortcuts = [
    {
      name: 'cancel',
      shortcut: 'esc',
      handler: handleKeyCommand(handlers.onClose),
    },
  ];

  const log = data.plainTextLog;
  let fileName;
  if (log) {
    const m = log.match(/Begin processing of (.*)/m);
    if (m) fileName = m[1];
  }

  const paneTitle = (
    <>
      {harvestable.name}
      ({formatDateTime(harvestable.lastHarvestFinished)})
      {' '}&mdash;{' '}
      <span className={`${css.status} ${css[`status_${status}`]}`}>
        <FormattedMessage id={`ui-harvester-admin.harvestables.column.currentStatus.${status}`} />
      </span>
    </>
  );

  const logStatus = status === 'RUNNING' ? 'running' : 'previous';
  const logLabel = (
    <>
      <FormattedMessage id={`ui-harvester-admin.logs.plainTextLog.${logStatus}`} />
      {fileName ? ` (${fileName})` : ''}
    </>
  );

  return (
    <HasCommand commands={shortcuts} isWithinScope={checkScope} scope={document.body}>
      <Pane
        appIcon={<AppIcon app="harvester-admin" />}
        centerContent
        defaultWidth="60%"
        id="pane-harvestable-logs"
        paneTitle={paneTitle}
        dismissible
        onClose={handlers.onClose}
      >
        <TitleManager record={title}>
          <HarvestableLogsHeader harvestable={harvestable} />
          <Accordion
            id="harvestable-logs-plain"
            label={logLabel}
            closedByDefault
          >
            <pre>
              {log || <NoValue />}
            </pre>
          </Accordion>
          <HarvestableLogsFailedRecords failedRecords={data.failedRecords} />
        </TitleManager>
      </Pane>
    </HasCommand>
  );
};


HarvestableLogs.propTypes = {
  data: PropTypes.shape({
    harvestable: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        lastHarvestFinished: PropTypes.string,
        currentStatus: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    plainTextLog: PropTypes.string,
    failedRecords: PropTypes.shape({}),
  }).isRequired,
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
  }),
  isLoading: PropTypes.bool,
};


export default HarvestableLogs;
