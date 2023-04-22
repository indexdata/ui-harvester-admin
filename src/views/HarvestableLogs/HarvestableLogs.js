import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { HasCommand, LoadingPane, Pane, checkScope } from '@folio/stripes/components';
import { AppIcon, TitleManager } from '@folio/stripes/core';
import formatDateTime from '../../util/formatDateTime';
import HarvestableLogsHeader from './HarvestableLogsHeader';
import HarvestableLogsPlainText from './HarvestableLogsPlainText';
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
    refreshLog,
  } = props;

  const record = data.record;
  if (isLoading || !record) return <LoadingPane />;
  const title = record.name;
  const status = record.currentStatus;

  const shortcuts = [
    {
      name: 'cancel',
      shortcut: 'esc',
      handler: handleKeyCommand(handlers.onClose),
    },
  ];

  const paneTitle = (
    <>
      {record.name}
      ({formatDateTime(record.lastHarvestFinished)})
      {status &&
        <>
          {' '}&mdash;{' '}
          <span className={`${css.status} ${css[`status_${status}`]}`}>
            <FormattedMessage id={`ui-harvester-admin.harvestables.column.currentStatus.${status}`} />
          </span>
        </>
      }
    </>
  );

  return (
    <HasCommand commands={shortcuts} isWithinScope={checkScope} scope={document.body}>
      <Pane
        appIcon={<AppIcon app="harvester-admin" />}
        centerContent
        defaultWidth="60%"
        id="pane-logs"
        paneTitle={paneTitle}
        dismissible
        onClose={handlers.onClose}
      >
        <TitleManager record={title}>
          <HarvestableLogsHeader record={record} />
          <HarvestableLogsPlainText record={record} log={data.plainTextLog} refreshLog={refreshLog} />
          <HarvestableLogsFailedRecords failedRecords={data.failedRecords} />
        </TitleManager>
      </Pane>
    </HasCommand>
  );
};


HarvestableLogs.propTypes = {
  data: PropTypes.shape({
    record: PropTypes.shape({
      name: PropTypes.string.isRequired,
      lastHarvestFinished: PropTypes.string,
      currentStatus: PropTypes.string, // .isRequired for harvestable, not for previous-job
    }),
    plainTextLog: PropTypes.string,
    failedRecords: PropTypes.shape({}),
  }).isRequired,
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
  }),
  isLoading: PropTypes.bool,
  refreshLog: PropTypes.func.isRequired,
};


export default HarvestableLogs;
