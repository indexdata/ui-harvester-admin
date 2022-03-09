import React from 'react';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Button, Icon, Pane, SearchField, Select } from '@folio/stripes/components';
import { parseFilters, deparseFilters, MultiSelectionFilter } from '@folio/stripes/smart-components';
import css from './Harvestables.css';


const NO_VALUE = 'NO';


function HarvestablesSearchPane(props) {
  const {
    defaultWidth,
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
  const searchableIndexes = ['name', 'id', 'message'].map(x => (
    { value: x, label: intl.formatMessage({ id: `ui-harvester-admin.harvestables.index.${x}` }) }
  ));

  const filterStruct = parseFilters(query.filters);

  const renderFilter = (field, optionTags, isMulti) => {
    const dataOptions = optionTags.map(tag => ({
      value: tag,
      label: intl.formatMessage({ id: `ui-harvester-admin.harvestables.column.${field}.${tag}` }),
    }));

    if (isMulti) {
      return (
        <MultiSelectionFilter
          name={`multifilter-${field}`}
          label={intl.formatMessage({ id: `ui-harvester-admin.harvestables.column.${field}` })}
          dataOptions={dataOptions}
          selectedValues={filterStruct[field]}
          onChange={(group) => {
            const fs2 = { ...filterStruct, [field]: group.values };
            updateQuery({ filters: deparseFilters(fs2) });
          }}
        />
      );
    }

    return (
      <Select
        label={intl.formatMessage({ id: `ui-harvester-admin.harvestables.column.${field}` })}
        dataOptions={[
          { value: NO_VALUE, label: intl.formatMessage({ id: 'ui-harvester-admin.no-value' }) },
          ...dataOptions
        ]}
        value={filterStruct[field] && filterStruct[field][0]}
        onChange={(e) => {
          const val = e.target.value;
          const fs2 = { ...filterStruct };
          delete fs2[field];
          if (val !== NO_VALUE) fs2[field] = [val];
          updateQuery({ filters: deparseFilters(fs2) });
        }}
      />
    );
  };

  return (
    <Pane
      defaultWidth={defaultWidth}
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

        {renderFilter('enabled', ['true', 'false'])}
        {renderFilter('jobClass', ['OaiPmhResource', 'XmlBulkResource', 'HarvestConnectorResource'])}
        {renderFilter('currentStatus', ['NEW', 'OK', 'WARN', 'ERROR', 'RUNNING', 'FINISHED', 'KILLED'], true)}

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
  defaultWidth: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  updateQuery:PropTypes.func.isRequired,
};


export default HarvestablesSearchPane;
