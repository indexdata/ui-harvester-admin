import React from 'react';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Button, Icon, Pane, SearchField } from '@folio/stripes/components';
import css from './Harvestables.css';


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
    mutator,
  } = props;
  const searchHandlers = getSearchHandlers();

  const stripes = useStripes();
  const onChangeIndex = (e) => {
    const qindex = e.target.value;
    stripes.logger.log('action', `changed query-index to '${qindex}'`);
    mutator.query.update({ qindex });
  };

  const intl = useIntl();
  if (!searchableIndexes) {
    searchableIndexes = rawSearchableIndexes.map(x => (
      { value: x.value, label: intl.formatMessage({ id: `ui-harvester-admin.harvestables.index.${x.label}` }) }
    ));
  }

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
    query: PropTypes.string.isRequired,
  }).isRequired,
  getSearchHandlers: PropTypes.func.isRequired,
  onSubmitSearch: PropTypes.func.isRequired,
  resetAll: PropTypes.func.isRequired,
  searchField: PropTypes.any, // eslint-disable-line react/forbid-prop-types

  // Passed explicitly by <Harvestables>
  query: PropTypes.object.isRequired,
  mutator: PropTypes.shape({
    query: PropTypes.shape({
      update: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};


export default HarvestablesSearchPane;
