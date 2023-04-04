import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { AppIcon } from '@folio/stripes/core';
import { LoadingPane, Paneset, Pane, MultiColumnList } from '@folio/stripes/components';
import { ColumnManager, SearchAndSortQuery } from '@folio/stripes/smart-components';
import formatDateTime from '../../util/formatDateTime';
import message2stats from '../../util/message2stats';
import OldLogsSearchPane from '../../search/OldLogsSearchPane';
import ErrorMessage from '../../components/ErrorMessage';
import packageInfo from '../../../package';


function HarvestableOldLogs({
  data,
  query,
  resultCount,
  updateQuery,
  error,
  hasLoaded,
  onNeedMoreData,
}) {
  if (error) return <ErrorMessage message={error} />;
  if (!hasLoaded) return <LoadingPane />;

  const columnMapping = {
    name: <FormattedMessage id="ui-harvester-admin.old-logs.column.name" />,
    status: <FormattedMessage id="ui-harvester-admin.old-logs.column.status" />,
    amountHarvested: <FormattedMessage id="ui-harvester-admin.old-logs.column.amountHarvested" />,
    seconds: <FormattedMessage id="ui-harvester-admin.old-logs.column.seconds" />,
    started: <FormattedMessage id="ui-harvester-admin.old-logs.column.started" />,
    finished: <FormattedMessage id="ui-harvester-admin.old-logs.column.finished" />,
    type: <FormattedMessage id="ui-harvester-admin.old-logs.column.type" />,
    message: <FormattedMessage id="ui-harvester-admin.old-logs.column.message" />,
  };

  const columnWidths = {
    name: '400px',
    status: '90px',
    amountHarvested: '110px',
    seconds: '100px',
    started: '210px',
    finished: '210px',
    type: '150px',
    message: '600px',
  };

  const formatter = {
    status: r => <FormattedMessage id={`ui-harvester-admin.harvestables.column.currentStatus.${r.status}`} />,
    amountHarvested: r => {
      const stats = message2stats(r.message);
      return `${r.amountHarvested} (${stats?.instances?.loaded})`;
    },
    started: r => formatDateTime(r.started),
    finished: r => formatDateTime(r.finished),
    seconds: r => Math.trunc((new Date(r.finished) - new Date(r.started)) / 1000),
    type: r => <FormattedMessage id={`ui-harvester-admin.harvestables.field.jobClass.${r.type}`} />,
    message: r => {
      const m = r.message.match(/^ *Instances_processed.*? /);
      return m ? m[0] : r.message;
    },
  };

  const paneTitle = !data.harvestable ?
    <FormattedMessage id="ui-harvester-admin.nav.logs" /> :
    <FormattedMessage
      id="ui-harvester-admin.nav.logs-for"
      values={{ name: data.harvestable.name }}
    />;

  return (
    <SearchAndSortQuery>
      {
        (sasqParams) => {
          return (
            <Paneset id="old-logs-paneset">
              <OldLogsSearchPane
                {...sasqParams}
                defaultWidth="20%"
                query={query}
                updateQuery={updateQuery}
              />
              <ColumnManager
                id="old-logs-visible-columns"
                columnMapping={columnMapping}
                excludeKeys={['name']}
                persist
              >
                {({ renderColumnsMenu, visibleColumns }) => (
                  <Pane
                    appIcon={<AppIcon app="harvester-admin" />}
                    defaultWidth="fill"
                    padContent={false}
                    paneTitle={paneTitle}
                    paneSub={<FormattedMessage id="ui-harvester-admin.resultCount" values={{ count: resultCount }} />}
                    actionMenu={() => renderColumnsMenu}
                  >
                    <MultiColumnList
                      autosize
                      id="list-old-jobs"
                      virtualize
                      visibleColumns={visibleColumns}
                      columnMapping={columnMapping}
                      columnWidths={columnWidths}
                      formatter={formatter}
                      contentData={data.oldLogs}
                      totalCount={resultCount}
                      onHeaderClick={sasqParams.onSort}
                      onNeedMoreData={onNeedMoreData}
                      onRowClick={(event, rec) => updateQuery({ _path: `XXX ${packageInfo.stripes.route}/harvestables/${rec.id}` })}
                    />
                  </Pane>
                )}
              </ColumnManager>
            </Paneset>
          );
        }
      }
    </SearchAndSortQuery>
  );
}


HarvestableOldLogs.propTypes = {
  data: PropTypes.shape({
    harvestable: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }), // optional
    oldLogs: PropTypes.arrayOf(
      PropTypes.shape({
        // XXX fill in
      }).isRequired,
    ).isRequired,
  }).isRequired,
  query: PropTypes.object.isRequired,
  resultCount: PropTypes.number,
  updateQuery:PropTypes.func.isRequired,
  error: PropTypes.string,
  hasLoaded: PropTypes.bool.isRequired,
  onNeedMoreData: PropTypes.func.isRequired,
};


export default HarvestableOldLogs;
