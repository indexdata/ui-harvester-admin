import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedTime, FormattedDate } from 'react-intl';
import { AppIcon } from '@folio/stripes/core';
import { LoadingPane, Paneset, Pane, MultiColumnList } from '@folio/stripes/components';
import { ColumnManager, SearchAndSortQuery } from '@folio/stripes/smart-components';
import message2stats from '../../util/message2stats';
import HarvestablesSearchPane from '../../search/HarvestablesSearchPane';
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
    started: <FormattedMessage id="ui-harvester-admin.old-logs.column.started" />,
    finished: <FormattedMessage id="ui-harvester-admin.old-logs.column.finished" />,
    type: <FormattedMessage id="ui-harvester-admin.old-logs.column.type" />,
  };

  return (
    <SearchAndSortQuery>
      {
        (sasqParams) => {
          return (
            <Paneset id="old-logs-paneset">
              {/* XXX Ostensibly id , harvestableId , name ,  type , and status are queryable */}
              <HarvestablesSearchPane
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
                    paneTitle={<FormattedMessage id="ui-harvester-admin.nav.old-logs" />}
                    paneSub={<FormattedMessage id="ui-harvester-admin.resultCount" values={{ count: resultCount }} />}
                    actionMenu={() => renderColumnsMenu}
                  >
                    <MultiColumnList
                      autosize
                      id="list-old-jobs"
                      virtualize
                      visibleColumns={visibleColumns}
                      columnMapping={columnMapping}
                      columnWidths={{
                        name: '400px',
                        currentStatus: '90px',
                        records: '90px',
                        lastHarvestFinished: '210px',
                        enabled: '80px',
                        jobClass: '150px',
                        id: '80px',
                        message: '600px',
                      }}
                      formatter={{
                        jobClass: r => <FormattedMessage id={`ui-harvester-admin.harvestables.column.jobClass.${r.jobClass}`} />,
                        currentStatus: r => <FormattedMessage id={`ui-harvester-admin.harvestables.column.currentStatus.${r.currentStatus}`} />,
                        records: r => {
                          const stats = message2stats(r.message);
                          return stats?.instances?.loaded;
                        },
                        lastHarvestFinished: r => (
                          <>
                            <FormattedTime value={r.lastHarvestFinished} />
                            {', '}
                            <FormattedDate value={r.lastHarvestFinished} year="numeric" month="long" day="numeric" />
                          </>
                        ),
                      }}
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
    oldLogs: PropTypes.arrayOf(
      PropTypes.shape({
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
