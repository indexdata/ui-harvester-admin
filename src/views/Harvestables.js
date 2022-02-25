import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { AppIcon } from '@folio/stripes/core';
import { LoadingPane, Paneset, Pane, MultiColumnList } from '@folio/stripes/components';
import { ColumnManager, SearchAndSortQuery } from '@folio/stripes/smart-components';
import HarvestablesSearchPane from '../search/HarvestablesSearchPane';
import ErrorMessage from '../util/ErrorMessage';


function Harvestables({
  data,
  query,
  source,
  mutator,
  error,
  hasLoaded,
  onNeedMoreData
}) {
  const count = source ? source.totalCount() : 0;

  if (error) return <ErrorMessage message={error} />;
  if (!hasLoaded) return <LoadingPane />;

  const columnMapping = {
    name: <FormattedMessage id="ui-harvester-admin.harvestables.column.name" />,
    id: <FormattedMessage id="ui-harvester-admin.harvestables.column.id" />,
    enabled: <FormattedMessage id="ui-harvester-admin.harvestables.column.enabled" />,
    jobClass: <FormattedMessage id="ui-harvester-admin.harvestables.column.jobClass" />,
    currentStatus: <FormattedMessage id="ui-harvester-admin.harvestables.column.currentStatus" />,
  };

  return (
    <SearchAndSortQuery>
      {
        (sasqParams) => {
          return (
            <Paneset id="harvestables-paneset">
              <HarvestablesSearchPane
                {...sasqParams}
                query={query}
                mutator={mutator}
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
                        id: '100px',
                        enabled: '100px',
                        jobClass: '150px',
                        currentStatus: '140px',
                      }}
                      formatter={{
                        jobClass: r => <FormattedMessage id={`ui-harvester-admin.harvestables.column.jobClass.${r.jobClass}`} />,
                      }}
                      contentData={data.harvestables}
                      totalCount={count}
                      onHeaderClick={sasqParams.onSort}
                      onNeedMoreData={onNeedMoreData}
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


Harvestables.propTypes = {
  data: PropTypes.shape({
    harvestables: PropTypes.arrayOf(
      PropTypes.shape({
      }).isRequired,
    ).isRequired,
  }).isRequired,
  query: PropTypes.object.isRequired,
  source: PropTypes.shape({
    totalCount: PropTypes.func.isRequired,
  }),
  mutator: PropTypes.shape({
    query: PropTypes.shape({
      update: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  error: PropTypes.string,
  hasLoaded: PropTypes.bool.isRequired,
  onNeedMoreData: PropTypes.func.isRequired,
};


export default Harvestables;
