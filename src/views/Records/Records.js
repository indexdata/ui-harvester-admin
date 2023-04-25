import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { AppIcon } from '@folio/stripes/core';
import { LoadingPane, Paneset, Pane, MultiColumnList, ErrorModal } from '@folio/stripes/components';
import { ColumnManager, SearchAndSortQuery } from '@folio/stripes/smart-components';
import parseSort from '../../util/parseSort';
import summarizeErrors from '../../util/summarizeErrors';
import RecordsSearchPane from '../../search/JobsSearchPane';
import ErrorMessage from '../../components/ErrorMessage';
import packageInfo from '../../../package';


function Records({
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
  if (error) return <ErrorMessage message={error} />;
  if (!hasLoaded) return <LoadingPane />;

  const columnMapping = {
    recordNumber: <FormattedMessage id="ui-harvester-admin.failed-records.recordNumber" />,
    instanceHrid: <FormattedMessage id="ui-harvester-admin.failed-records.instanceHrid" />,
    instanceTitle: <FormattedMessage id="ui-harvester-admin.failed-records.instanceTitle" />,
    errors: <FormattedMessage id="ui-harvester-admin.failed-records.errors" />,
    timeStamp: <FormattedMessage id="ui-harvester-admin.failed-records.timeStamp" />,
  };

  const columnWidths = {
    recordNumber: '150px',
    instanceHrid: '120px',
    instanceTitle: '300px',
  };

  const formatter = {
    instanceHrid: r => r.transformedRecord?.instance?.hrid,
    instanceTitle: r => r.transformedRecord?.instance?.title,
    errors: r => summarizeErrors(r.recordErrors),
  };

  const paneTitle = !data.harvestable ?
    <FormattedMessage id="ui-harvester-admin.nav.records" /> :
    <FormattedMessage
      id="ui-harvester-admin.nav.records-for"
      values={{ name: data.harvestable.name }}
    />;

  const sortKeys = parseSort(query.sort);
  const sortedColumn = sortKeys[0]?.key;
  const sortDirection = sortKeys[0]?.descending ? 'descending' : 'ascending';

  return (
    <SearchAndSortQuery>
      {
        (sasqParams) => {
          return (
            <Paneset id="records-paneset">
              <RecordsSearchPane
                {...sasqParams}
                defaultWidth="20%"
                query={query}
                updateQuery={updateQuery}
              />
              <ColumnManager
                id="records-visible-columns"
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
                      id="list-records"
                      virtualize
                      visibleColumns={visibleColumns}
                      columnMapping={columnMapping}
                      columnWidths={columnWidths}
                      formatter={formatter}
                      contentData={data.records}
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
                      sortedColumn={sortedColumn}
                      sortDirection={sortDirection}
                      onRowClick={(event, rec) => updateQuery({ _path: `${packageInfo.stripes.route}/records/${rec.id}` })}
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


Records.propTypes = {
  data: PropTypes.shape({
    harvestable: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }), // optional
    records: PropTypes.arrayOf(
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


export default Records;
