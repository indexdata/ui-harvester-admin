import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import { AppIcon } from '@folio/stripes/core';
import { LoadingPane, Paneset, Pane, MultiColumnList, ErrorModal } from '@folio/stripes/components';
import { ColumnManager, SearchAndSortQuery } from '@folio/stripes/smart-components';
import formatDateTime from '../../util/formatDateTime';
import { message2stats, summarizeStats } from '../../util/message2stats';
import JobsSearchPane from '../../search/JobsSearchPane';
import ErrorMessage from '../../components/ErrorMessage';
import packageInfo from '../../../package';


function Jobs({
  data,
  query,
  resultCount,
  updateQuery,
  error,
  hasLoaded,
  onNeedMoreData,
  children,
}) {
  const [invalidSortKey, setInvalidSortKey] = useState();
  const intl = useIntl();
  if (error) return <ErrorMessage message={error} />;
  if (!hasLoaded) return <LoadingPane />;

  const columnMapping = {
    name: <FormattedMessage id="ui-harvester-admin.jobs.column.name" />,
    status: <FormattedMessage id="ui-harvester-admin.jobs.column.status" />,
    amountHarvested: <FormattedMessage id="ui-harvester-admin.jobs.column.amountHarvested" />,
    seconds: <FormattedMessage id="ui-harvester-admin.jobs.column.seconds" />,
    started: <FormattedMessage id="ui-harvester-admin.jobs.column.started" />,
    finished: <FormattedMessage id="ui-harvester-admin.jobs.column.finished" />,
    type: <FormattedMessage id="ui-harvester-admin.jobs.column.type" />,
    message: <FormattedMessage id="ui-harvester-admin.jobs.column.message" />,
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
    message: r => (r.message?.match('Instances_processed') ? summarizeStats(intl, r.message) : r.message),
  };

  const paneTitle = !data.harvestable ?
    <FormattedMessage id="ui-harvester-admin.nav.jobs" /> :
    <FormattedMessage
      id="ui-harvester-admin.nav.jobs-for"
      values={{ name: data.harvestable.name }}
    />;

  return (
    <SearchAndSortQuery>
      {
        (sasqParams) => {
          return (
            <Paneset id="jobs-paneset">
              <JobsSearchPane
                {...sasqParams}
                defaultWidth="20%"
                query={query}
                updateQuery={updateQuery}
              />
              <ColumnManager
                id="jobs-visible-columns"
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
                      id="list-jobs"
                      virtualize
                      visibleColumns={visibleColumns}
                      columnMapping={columnMapping}
                      columnWidths={columnWidths}
                      formatter={formatter}
                      contentData={data.jobs}
                      totalCount={resultCount}
                      onHeaderClick={(event, headerMetadata) => {
                        if (headerMetadata.name === 'seconds') {
                          setInvalidSortKey(headerMetadata.name);
                          return undefined;
                        } else {
                          return sasqParams.onSort(event, headerMetadata);
                        }
                      }}
                      onNeedMoreData={onNeedMoreData}
                      onRowClick={(event, rec) => updateQuery({ _path: `${packageInfo.stripes.route}/jobs/${rec.id}` })}
                    />
                    <ErrorModal
                      open={!!invalidSortKey}
                      label={<FormattedMessage id="ui-harvester-admin.error.invalidSort.label" />}
                      content={<FormattedMessage
                        id="ui-harvester-admin.error.invalidSort.content"
                        values={{ name: invalidSortKey, code: s => <code>{s}</code> }}
                      />}
                      onClose={() => setInvalidSortKey(undefined)}
                    />
                  </Pane>
                )}
              </ColumnManager>
              {children}
            </Paneset>
          );
        }
      }
    </SearchAndSortQuery>
  );
}


Jobs.propTypes = {
  data: PropTypes.shape({
    harvestable: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }), // optional
    jobs: PropTypes.arrayOf(
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
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  ]),
};


export default Jobs;
