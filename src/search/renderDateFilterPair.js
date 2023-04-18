import React from 'react';
import { Accordion, FilterAccordionHeader, Datepicker } from '@folio/stripes/components';
import { deparseFilters } from '@folio/stripes/smart-components';


// Ways in which this is currently deficient:
//      * When the search pane is narrow, I want the Datepicker to render across into the search-results pane. I had hoped that `usePortal` prop would do this, but it does not.
//      * I want an ISO-format date back, not a localized one. I had hoped that the `backendDateStandard` or `outputBackendValue` prop would do this, but they do not.
//
function renderSingleDateFilter(intl, filterStruct, updateQuery, field, boundary) {
  const keyString = `${field}_${boundary}`;
  const rawValue = filterStruct[keyString]?.[0];
  const value = !rawValue ? '' : rawValue.replace(/.*[<>]=/, '');
  const op = boundary === 'from' ? '>=' : '<=';

  return (
    <Datepicker
      label={intl.formatMessage({ id: `ui-harvester-admin.filter.date.${field}.${boundary}` })}
      value={value}
      onChange={(e) => {
        const isoDateTime = e.target.value;
        if (isoDateTime === '') {
          // This can happen when navigating away to Settings then hitting the back button.
          // I have no idea why doing so activates the click-handler, but it does.
          // In this case, we will not break the query string by setting the empty value into it.
          return;
        }
        const isoDate = isoDateTime.substring(0, 10);
        // We want the format filters=startDate.startDate>=2023-04-13,startDate.startDate<=2023-04-28
        const fs2 = { ...filterStruct, [keyString]: [`${field}${op}${isoDate}`] };
        updateQuery({ filters: deparseFilters(fs2) });
      }}
      useInput
    />
  );
}


function renderDateFilterPair(intl, filterStruct, updateQuery, field) {
  return (
    <Accordion
      label={intl.formatMessage({ id: `ui-harvester-admin.filter.date.${field}` })}
      header={FilterAccordionHeader}
      closedByDefault
    >
      {renderSingleDateFilter(intl, filterStruct, updateQuery, field, 'from')}
      {renderSingleDateFilter(intl, filterStruct, updateQuery, field, 'to')}
    </Accordion>
  );
}


export default renderDateFilterPair;
