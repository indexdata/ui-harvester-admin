import React from 'react';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Button, Icon, Pane, SearchField } from '@folio/stripes/components';
import { parseFilters } from '@folio/stripes/smart-components';
import renderFilter from './renderFilter';
import css from './Harvestables.css';


function HarvestablesSearchPane(props) {
  const {
    defaultWidth,
    searchValue,
    getSearchHandlers,
    onSubmitSearch,
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

        {renderFilter(intl, filterStruct, updateQuery, 'enabled', ['true', 'false'])}
        {renderFilter(intl, filterStruct, updateQuery, 'jobClass', ['OaiPmhResource', 'XmlBulkResource', 'HarvestConnectorResource', 'StatusResource'])}
        {renderFilter(intl, filterStruct, updateQuery, 'currentStatus', ['NEW', 'OK', 'WARN', 'ERROR', 'RUNNING', 'FINISHED', 'KILLED'], true)}

        <div className={css.resetButtonWrap}>
          <Button
            buttonStyle="none"
            id="clickable-reset-all"
            disabled={false}
            onClick={() => updateQuery({ query: undefined, sort: undefined, filters: undefined })}
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
  searchField: PropTypes.any, // eslint-disable-line react/forbid-prop-types

  // Passed explicitly by caller
  defaultWidth: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  updateQuery:PropTypes.func.isRequired,
};


export default HarvestablesSearchPane;
