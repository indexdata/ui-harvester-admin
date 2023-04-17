import React from 'react';
import { Accordion, FilterAccordionHeader, Datepicker } from '@folio/stripes/components';


// Ways in which this is currently deficient:
//      * When the search pane is narrow, I want the Datepicker to render across into the search-results pane. I had hoped that `usePortal` prop would do this, but it does not.
//      * I want an ISO-format date back, not a localized one. I had hoped that the `backendDateStandard` or `outputBackendValue` prop would do this, but they do not.
//
function renderSingleDateFilter(intl, query, updateQuery, field, boundary) {
  const keyString = `${field}.${boundary}`;

  return (
    <Datepicker
      label={intl.formatMessage({ id: `ui-harvester-admin.filter.date.${field}.${boundary}` })}
      value={query[keyString] || ''}
      onChange={(e) => {
        const localizedDateString = e.target.value;
        const date = new Date(localizedDateString); // XXX only works under US locale
        console.log('date =', date);
        const isoDateString = date.toISOString().substring(0, 10);
        console.log('isoDateString =', isoDateString);
        updateQuery({ [keyString]: isoDateString });
      }}
    />
  );
}


function renderDateFilterPair(intl, query, updateQuery, field) {
  return (
    <Accordion
      label={intl.formatMessage({ id: `ui-harvester-admin.filter.date.${field}` })}
      header={FilterAccordionHeader}
      closedByDefault
    >
      {renderSingleDateFilter(intl, query, updateQuery, field, 'from')}
      {renderSingleDateFilter(intl, query, updateQuery, field, 'to')}
    </Accordion>
  );
}


export default renderDateFilterPair;
