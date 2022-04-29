import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedTime, FormattedDate } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { IfPermission, AppIcon } from '@folio/stripes/core';
import { LoadingPane, Paneset, Pane, MultiColumnList, PaneMenu, MenuSection, Button, Icon } from '@folio/stripes/components';
import { parseFilters, ColumnManager, SearchAndSortQuery } from '@folio/stripes/smart-components';
import HarvestablesSearchPane from '../search/HarvestablesSearchPane';
import ErrorMessage from '../components/ErrorMessage';
import packageInfo from '../../package';
import css from './Harvestables.css';


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


// For reasons I do not understand, the two sections of this menu
// render side-by-side instead of one above the other. To mitigate
// this, I am currently separating the two columns of menu items with
// unbreakable spaces, but this is clearly unsatisfactory. See the
// Slack thread beginning at
// https://folio-project.slack.com/archives/C210UCHQ9/p1651229725562429
//
function renderActionsMenu(search, renderedColumnsMenu) {
  return (
    <PaneMenu>
      <IfPermission perm="harvester-admin.harvestables.item.post">
        <MenuSection id="actions-menu-section" label={<FormattedMessage id="ui-harvester-admin.actions.new" />}>
          {['oaiPmh', 'xmlBulk', 'connector', 'status'].map(type => (
            <FormattedMessage id={`ui-harvester-admin.actions.new.harvestable.${type}`}>
              {ariaLabel => (
                <Button
                  id={`clickable-new-harvestable-${type}`}
                  aria-label={ariaLabel}
                  to={`/ha/harvestables/create/${type}${search}`}
                  buttonStyle="dropdownItem"
                  marginBottom0
                >
                  <Icon icon="plus-sign">
                    <FormattedMessage id={`ui-harvester-admin.actions.new.harvestable.${type}`} />
                  </Icon>
                </Button>
              )}
            </FormattedMessage>
          ))}
        </MenuSection>
      </IfPermission>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {renderedColumnsMenu}
    </PaneMenu>
  );
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
  const location = useLocation();
  if (error) return <ErrorMessage message={error} />;
  if (!hasLoaded) return <LoadingPane />;

  const columnMapping = {
    name: <FormattedMessage id="ui-harvester-admin.harvestables.column.name" />,
    currentStatus: <FormattedMessage id="ui-harvester-admin.harvestables.column.currentStatus" />,
    lastHarvestFinished: <FormattedMessage id="ui-harvester-admin.harvestables.column.lastHarvestFinished" />,
    enabled: <FormattedMessage id="ui-harvester-admin.harvestables.column.enabled" />,
    jobClass: <FormattedMessage id="ui-harvester-admin.harvestables.column.jobClass" />,
    id: <FormattedMessage id="ui-harvester-admin.harvestables.column.id" />,
    message: <FormattedMessage id="ui-harvester-admin.harvestables.column.message" />,
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
                    actionMenu={() => renderActionsMenu(location.search, renderColumnsMenu)}
                  >
                    <MultiColumnList
                      autosize
                      id="list-harvestables"
                      virtualize
                      visibleColumns={visibleColumns}
                      columnMapping={columnMapping}
                      columnWidths={{
                        name: '400px',
                        id: '80px',
                        enabled: '80px',
                        jobClass: '150px',
                        currentStatus: '80px',
                      }}
                      formatter={{
                        enabled: r => <FormattedMessage id={`ui-harvester-admin.harvestables.column.enabled.${r.enabled}`} />,
                        jobClass: r => <FormattedMessage id={`ui-harvester-admin.harvestables.column.jobClass.${r.jobClass}`} />,
                        currentStatus: r => <FormattedMessage id={`ui-harvester-admin.harvestables.column.currentStatus.${r.currentStatus}`} />,
                        lastHarvestFinished: r => (
                          <>
                            <FormattedTime value={r.lastHarvestFinished} />
                            {', '}
                            <FormattedDate value={r.lastHarvestFinished} year="numeric" month="long" day="numeric" />
                          </>
                        ),
                        message: r => (
                          <ul className={css.noDot}>
                            {r.message?.split(' ').filter(s => !!s).map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        ),
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
  createNew: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};


export default Harvestables;
