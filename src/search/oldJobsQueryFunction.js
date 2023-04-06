import { makeQueryFunction } from '@folio/stripes/smart-components';

const sortMap = {
  // XXX I _think_ all the headings are the names of sortable fields
  // Verify this when server-side sorting starts to work
};

const filterConfig = [{
  name: 'status',
  cql: 'status',
  values: [],
}, {
  name: 'type',
  cql: 'type',
  values: [],
}, {
  // Value is injected from path-component by HarvestableOldJobsRoute's query function
  name: 'harvestableId',
  cql: 'harvestableId',
  values: [],
}];

const oldJobsQueryFunction = makeQueryFunction(
  'cql.allRecords=1',
  'name="%{query.query}*"', // XXX cannot yet add: 'or id="%{query.query}" or harvestableId="%{query.query}"',
  sortMap,
  filterConfig,
);

export default oldJobsQueryFunction;
