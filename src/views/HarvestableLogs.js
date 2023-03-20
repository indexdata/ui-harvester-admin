import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import { HasCommand, LoadingPane, Pane, checkScope } from '@folio/stripes/components';
import { AppIcon, TitleManager } from '@folio/stripes/core';


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

  if (isLoading) return <LoadingPane />;
  const harvestable = data.harvestable[0];
  const title = harvestable?.name;

  const shortcuts = [
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
        id="pane-harvestable-logs"
        paneTitle={title}
        dismissible
        onClose={handlers.onClose}
      >
        <TitleManager record={title}>
          <pre>
            {data.plainTextLog}
          </pre>
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
      }).isRequired,
    ).isRequired,
    plainTextLog: PropTypes.string,
  }).isRequired,
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
  }),
  isLoading: PropTypes.bool,
};


export default HarvestableLogs;
