import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Button, Icon, Pane, SearchField } from '@folio/stripes/components';
import { parseFilters } from '@folio/stripes/smart-components';
import renderDateFilterPair from './renderDateFilterPair';
import searchPanePropTypes from './searchPanePropTypes';
import css from './SearchPane.css';


function RecordsSearchPane(props) {
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

  const indexNames = [
    'all',
    'recordNumber',
    // 'instanceHrid', // XXX not yet supported
    // 'instanceTitle', // XXX not yet supported
    // 'errors', // XXX not yet supported
    'harvestableName', // XXX works, but will not accept masking characters
  ];
  const searchableIndexes = indexNames.map(x => ({
    value: x === 'all' ? '' : x,
    label: intl.formatMessage({ id: `ui-harvester-admin.records.index.${x}` }),
  }));

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
                data-test-records-search-input
                id="input-records-search"
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
            id="clickable-records-search"
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
            onClick={() => updateQuery({ qindex: '', query: undefined, sort: undefined, filters: undefined })}
          >
            <Icon icon="times-circle-solid">
              <FormattedMessage id="stripes-smart-components.resetAll" />
            </Icon>
          </Button>
        </div>

        {renderDateFilterPair(intl, filterStruct, updateQuery, 'timeStamp', true)}

      </form>
    </Pane>
  );
}


RecordsSearchPane.propTypes = searchPanePropTypes;


export default RecordsSearchPane;
