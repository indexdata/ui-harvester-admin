import React from 'react';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Button, Icon, Pane, SearchField, Select } from '@folio/stripes/components';
import { parseFilters, deparseFilters } from '@folio/stripes/smart-components';
import css from './Harvestables.css';


const NO_VALUE = 'NO';


// Value gets set into the `qindex` parameter of the UI URL, and used in the generated back-end query
const rawSearchableIndexes = [
  { label: 'name', value: 'name' },
  { label: 'id', value: 'id' },
  { label: 'message', value: 'message' },
  // XXX More to follow
];
let searchableIndexes;


function HarvestablesSearchPane(props) {
  const {
    searchValue,
    getSearchHandlers,
    onSubmitSearch,
    resetAll,
    searchField,
    query,
    updateQuery,
  } = props;
  const searchHandlers = getSearchHandlers();

  const stripes = useStripes();
  const onChangeIndex = (e) => {
    const qindex = e.target.value;
    stripes.logger.log('action', `changed query-index to '${qindex}'`);
    updateQuery({ qindex });
  };

  const intl = useIntl();
  if (!searchableIndexes) {
    searchableIndexes = rawSearchableIndexes.map(x => (
      { value: x.value, label: intl.formatMessage({ id: `ui-harvester-admin.harvestables.index.${x.label}` }) }
    ));
  }

  const filterStruct = parseFilters(query.filters);

  const jobClassDataOptions = ['OaiPmhResource', 'XmlBulkResource', 'HarvestConnectorResource'].map(tag => ({
    value: tag,
    label: intl.formatMessage({ id: `ui-harvester-admin.harvestables.column.jobClass.${tag}` }),
  }));

  return (
    <Pane
      defaultWidth="20%"
      paneTitle={<FormattedMessage id="stripes-smart-components.searchAndFilter" />}
    >
      <form onSubmit={onSubmitSearch}>
        <div className={css.searchGroupWrap}>
          <FormattedMessage id="ui-harvester-admin.searchInputLabel">
            { ([ariaLabel]) => (
              <SearchField
                data-test-harvestables-search-input
                id="input-harvestables-search"
                autoFocus
                ariaLabel={ariaLabel}
                className={css.searchField}
                searchableIndexes={searchableIndexes}
                selectedIndex={query.qindex}
                value={searchValue.query}
                marginBottom0
                onChangeIndex={onChangeIndex}
                onChange={searchHandlers.query}
                onClear={searchHandlers.reset}
                name="query"
                inputref={searchField}
              />
            )}
          </FormattedMessage>
          <Button
            buttonStyle="primary"
            disabled={!searchValue.query || searchValue.query === ''}
            fullWidth
            id="clickable-harvestables-search"
            marginBottom0
            type="submit"
          >
            <FormattedMessage id="stripes-smart-components.search" />
          </Button>
        </div>

        <Select
          label={intl.formatMessage({ id: 'ui-harvester-admin.harvestables.column.enabled' })}
          dataOptions={[
            { value: NO_VALUE, label: intl.formatMessage({ id: 'ui-harvester-admin.no-value' }) },
            { value: 'true', label: intl.formatMessage({ id: 'ui-harvester-admin.harvestables.column.enabled.yes' }) },
            { value: 'false', label: intl.formatMessage({ id: 'ui-harvester-admin.harvestables.column.enabled.no' }) },
          ]}
          value={filterStruct.enabled && filterStruct.enabled[0]}
          onChange={(e) => {
            const val = e.target.value;
            const fs2 = { ...filterStruct };
            delete fs2.enabled;
            if (val !== NO_VALUE) fs2.enabled = [val];
            updateQuery({ filters: deparseFilters(fs2) });
          }}
        />

        <Select
          label={intl.formatMessage({ id: 'ui-harvester-admin.harvestables.column.jobClass' })}
          dataOptions={[
            { value: NO_VALUE, label: intl.formatMessage({ id: 'ui-harvester-admin.no-value' }) },
            ...jobClassDataOptions
          ]}
          value={filterStruct.jobClass && filterStruct.jobClass[0]}
          onChange={(e) => {
            const val = e.target.value;
            const fs2 = { ...filterStruct };
            delete fs2.jobClass;
            if (val !== NO_VALUE) fs2.jobClass = [val];
            updateQuery({ filters: deparseFilters(fs2) });
          }}
        />

        <div className={css.resetButtonWrap}>
          <Button
            buttonStyle="none"
            id="clickable-reset-all"
            disabled={false}
            onClick={resetAll}
          >
            <Icon icon="times-circle-solid">
              <FormattedMessage id="stripes-smart-components.resetAll" />
            </Icon>
          </Button>
        </div>
      </form>
    </Pane>
  );
}


HarvestablesSearchPane.propTypes = {
  // Passed as SASQ parameters
  searchValue: PropTypes.shape({
    query: PropTypes.string,
  }).isRequired,
  getSearchHandlers: PropTypes.func.isRequired,
  onSubmitSearch: PropTypes.func.isRequired,
  resetAll: PropTypes.func.isRequired,
  searchField: PropTypes.any, // eslint-disable-line react/forbid-prop-types

  // Passed explicitly by <Harvestables>
  query: PropTypes.object.isRequired,
  updateQuery:PropTypes.func.isRequired,
};


export default HarvestablesSearchPane;
