import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LoadingPane, MultiColumnList } from '@folio/stripes/components';
import { SearchAndSortQuery } from '@folio/stripes/smart-components';


function Harvestables({
  data,
  query, // eslint-disable-line no-unused-vars
  source,
  mutator, // eslint-disable-line no-unused-vars
  hasLoaded,
  onNeedMoreData
}) {
  const count = source ? source.totalCount() : 0;

  if (!hasLoaded) return <LoadingPane />;

  return (
    <SearchAndSortQuery initialSearchState={{ query: '' }}>
      {
        (sasqParams) => {
          return (
            <MultiColumnList
              id="list-harvestables"
              virtualize
              visibleColumns={['name', 'id', 'enabled', 'jobClass', 'currentStatus']}
              columnMapping={{
                name: <FormattedMessage id="ui-harvester-admin.harvestables.column.name" />,
                id: <FormattedMessage id="ui-harvester-admin.harvestables.column.id" />,
                enabled: <FormattedMessage id="ui-harvester-admin.harvestables.column.enabled" />,
                jobClass: <FormattedMessage id="ui-harvester-admin.harvestables.column.jobClass" />,
                currentStatus: <FormattedMessage id="ui-harvester-admin.harvestables.column.currentStatus" />,
              }}
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
  hasLoaded: PropTypes.bool.isRequired,
  onNeedMoreData: PropTypes.func.isRequired,
};


export default Harvestables;
