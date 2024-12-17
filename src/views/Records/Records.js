import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { AppIcon } from '@folio/stripes/core';
import { MenuSection, Button, Icon, LoadingPane, Paneset, Pane, MultiColumnList, ErrorModal, exportToCsv, MCLPagingTypes } from '@folio/stripes/components';
import { ColumnManager, SearchAndSortQuery } from '@folio/stripes/smart-components';
import parseSort from '../../util/parseSort';
import { errors2react, errors2string } from '../../util/summarizeErrors';
import RecordsSearchPane from '../../search/RecordsSearchPane';
import ErrorMessage from '../../components/ErrorMessage';
import packageInfo from '../../../package';


function renderActionMenu(onToggle, intl, data, renderedColumnsMenu) {
  return (
    <div>
      <MenuSection label={intl.formatMessage({ id: 'ui-harvester-admin.reports' })}>
        <Button
          aria-label={intl.formatMessage({ id: 'ui-harvester-admin.export-csv' })}
          disabled={data.records.length === 0}
          buttonStyle="dropdownItem"
          onClick={() => {
            const expanded = data.records.map(r => ({
              ...r,
              errors: errors2string(r.recordErrors),
            }));
            exportToCsv(expanded, {});
            onToggle();
          }}
        >
          <Icon icon="download">
            <FormattedMessage id="ui-harvester-admin.export-csv" />
          </Icon>
        </Button>
      </MenuSection>
      {renderedColumnsMenu}
    </div>
  );
}


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
  const intl = useIntl();
  const [invalidSortKey, setInvalidSortKey] = useState();

  const columnMapping = {
    recordNumber: <FormattedMessage id="ui-harvester-admin.failed-records.recordNumber" />,
    instanceHrid: <FormattedMessage id="ui-harvester-admin.failed-records.instanceHrid" />,
    instanceTitle: <FormattedMessage id="ui-harvester-admin.failed-records.instanceTitle" />,
    errors: <FormattedMessage id="ui-harvester-admin.failed-records.errors" />,
    timeStamp: <FormattedMessage id="ui-harvester-admin.failed-records.timeStamp" />,
    harvestableName: <FormattedMessage id="ui-harvester-admin.failed-records.harvestableName" />,
  };

  const columnWidths = {
    harvestableName: '300px',
    recordNumber: '150px',
    instanceHrid: '140px',
    instanceTitle: '300px',
  };

  const formatter = {
    instanceHrid: r => r.transformedRecord?.instance?.hrid,
    instanceTitle: r => r.transformedRecord?.instance?.title,
    errors: r => errors2react(r.recordErrors),
  };

  const paneTitle = <FormattedMessage id="ui-harvester-admin.nav.records" />;

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
              {
                error ? <ErrorMessage message={error} /> :
                  !hasLoaded ? <LoadingPane /> :
                  <ColumnManager
                    id="records-visible-columns"
                    columnMapping={columnMapping}
                    excludeKeys={['recordNumber']}
                    persist
                  >
                    {({ renderColumnsMenu, visibleColumns }) => (
                      <Pane
                        appIcon={<AppIcon app="harvester-admin" />}
                        defaultWidth="fill"
                        padContent={false}
                        paneTitle={paneTitle}
                        paneSub={<FormattedMessage id="ui-harvester-admin.resultCount" values={{ count: resultCount }} />}
                        actionMenu={({ onToggle }) => renderActionMenu(onToggle, intl, data, renderColumnsMenu)}
                      >
                        <MultiColumnList
                          autosize
                          id="list-records"
                          visibleColumns={visibleColumns}
                          columnMapping={columnMapping}
                          columnWidths={columnWidths}
                          formatter={formatter}
                          contentData={data.records}
                          totalCount={resultCount}
                          onHeaderClick={sasqParams.onSort}
                          nonInteractiveHeaders={['instanceHrid', 'instanceTitle', 'errors']}
                          onNeedMoreData={onNeedMoreData}
                          sortedColumn={sortedColumn}
                          sortDirection={sortDirection}
                          pagingType={MCLPagingTypes.PREV_NEXT}
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
              }
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
