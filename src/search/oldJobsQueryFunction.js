import { makeQueryFunction } from '@folio/stripes/smart-components';

const sortMap = {
  // XXX I _think_ all the headings are the names of sortable fields
  // Verify this when server-side sorting starts to work
};

function parseFilterValue(field, op, value) {
  console.log(`parseFilterValue field='${field}', op='${op}' value='${value}'`);
  return `${field}${op}${value}`;
}

function makePFV(field, op) {
  return (value) => parseFilterValue(field, op, value);
}

const filterConfig = [{
  name: 'status',
  cql: 'status',
  values: [],
}, {
  name: 'type',
  cql: 'type',
  values: [],
}, {
  name: 'started_from',
  cql: 'started_from',
  values: [],
  parse: makePFV('started', '>='),
}, {
  name: 'started_to',
  cql: 'started_to',
  values: [],
  parse: makePFV('started', '<='),
}, {
  name: 'ended_from',
  cql: 'ended_from',
  values: [],
  parse: makePFV('ended', '>='),
}, {
  name: 'ended_to',
  cql: 'ended_to',
  values: [],
  parse: makePFV('ended', '<='),
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
