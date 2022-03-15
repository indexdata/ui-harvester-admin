import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { AppIcon } from '@folio/stripes/core';
import { LoadingPane, Paneset, Pane, MultiColumnList } from '@folio/stripes/components';
import { parseFilters, ColumnManager, SearchAndSortQuery } from '@folio/stripes/smart-components';
import HarvestablesSearchPane from '../search/HarvestablesSearchPane';
import ErrorMessage from '../components/ErrorMessage';
import packageInfo from '../../package';


function parseSort(sort) {
  if (sort === undefined || sort === '') return [];
  return sort.split(',').map(s => (
    s.startsWith('-') ?
      { key: s.substring(1), descending: true } :
      { key: s, descending: false }
  ));
}

/*
 * Server-side limitations mean that queries submitted to
 * mod-harvester-admin cannot include filtering criteria and that the
 * data returned is not sorted according to the `orderBy`
 * parameter. Since the total size of the data-set is small, we do the
 * filtering and sorting by hand here in the display component.
 *
 * DO NOT TRY THIS AT HOME.
 */
function manuallyFilterAndSort(query, raw) {
  const { filters, sort } = query;
  const filterStruct = parseFilters(filters);
  const sortKeys = parseSort(sort);

  const filterKeys = Object.keys(filterStruct).sort();
  const filtered = raw.filter(entry => {
    for (let i = 0; i < filterKeys.length; i++) {
      const key = filterKeys[i];
      const values = filterStruct[key];
      if (values.indexOf(entry[key]) === -1) return false;
    }
    return true;
  });

  if (sortKeys.length === 0) return filtered;

  return filtered.sort((a, b) => {
    for (let i = 0; i < sortKeys.length; i++) {
      const { key, descending } = sortKeys[i];
      if (a[key] === b[key]) continue; // eslint-disable-line no-continue
      const tmp = a[key] < b[key] ? -1 : 1;
      return descending ? -tmp : tmp;
    }

    // All keys were equal in value
    return 0;
  });
}


function Harvestables({
  data,
  query,
  resultCount,
  updateQuery,
  error,
  hasLoaded,
  onNeedMoreData,
  children,
}) {
  if (error) return <ErrorMessage message={error} />;
  if (!hasLoaded) return <LoadingPane />;

  const columnMapping = {
    name: <FormattedMessage id="ui-harvester-admin.harvestables.column.name" />,
    id: <FormattedMessage id="ui-harvester-admin.harvestables.column.id" />,
    enabled: <FormattedMessage id="ui-harvester-admin.harvestables.column.enabled" />,
    jobClass: <FormattedMessage id="ui-harvester-admin.harvestables.column.jobClass" />,
    currentStatus: <FormattedMessage id="ui-harvester-admin.harvestables.column.currentStatus" />,
  };

  const harvestables = manuallyFilterAndSort(query, data.harvestables);
  return (
    <SearchAndSortQuery>
      {
        (sasqParams) => {
          return (
            <Paneset id="harvestables-paneset">
              <HarvestablesSearchPane
                {...sasqParams}
                defaultWidth="20%"
                query={query}
                updateQuery={updateQuery}
              />
              <ColumnManager
                id="harvestable-visible-columns"
                columnMapping={columnMapping}
                excludeKeys={['name']}
              >
                {({ renderColumnsMenu, visibleColumns }) => (
                  <Pane
                    appIcon={<AppIcon app="harvester-admin" />}
                    defaultWidth="fill"
                    padContent={false}
                    paneTitle={<FormattedMessage id="ui-harvester-admin.nav.harvestables" />}
                    paneSub={<FormattedMessage id="ui-harvester-admin.resultCount" values={{ count: resultCount }} />}
                    actionMenu={() => (
                      <>
                        {renderColumnsMenu}
                      </>
                    )}
                  >
                    <MultiColumnList
                      id="list-harvestables"
                      virtualize
                      visibleColumns={visibleColumns}
                      columnMapping={columnMapping}
                      columnWidths={{
                        name: '400px',
                        id: '80px',
                        enabled: '80px',
                        jobClass: '150px',
                        currentStatus: '140px',
                      }}
                      formatter={{
                        enabled: r => <FormattedMessage id={`ui-harvester-admin.harvestables.column.enabled.${r.enabled}`} />,
                        jobClass: r => <FormattedMessage id={`ui-harvester-admin.harvestables.column.jobClass.${r.jobClass}`} />,
                        currentStatus: r => <FormattedMessage id={`ui-harvester-admin.harvestables.column.currentStatus.${r.currentStatus}`} />,
                      }}
                      contentData={harvestables}
                      totalCount={resultCount}
                      onHeaderClick={sasqParams.onSort}
                      onNeedMoreData={onNeedMoreData}
                      onRowClick={(event, rec) => updateQuery({ _path: `${packageInfo.stripes.route}/harvestables/${rec.id}` })}
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


Harvestables.propTypes = {
  data: PropTypes.shape({
    harvestables: PropTypes.arrayOf(
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
  children: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};


export default Harvestables;
