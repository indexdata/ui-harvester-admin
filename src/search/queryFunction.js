import { makeQueryFunction } from '@folio/stripes/smart-components';

const sortMap = {
  // XXX I _think_ all the headings are the names of sortable fields
  // Verify this when server-side sorting starts to work
};

function parseFilterValue(field, op, value) {
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
  name: 'finished_from',
  cql: 'finished_from',
  values: [],
  parse: makePFV('finished', '>='),
}, {
  name: 'finished_to',
  cql: 'finished_to',
  values: [],
  parse: makePFV('finished', '<='),
}, {
  name: 'timeStamp_from',
  cql: 'timeStamp_from',
  values: [],
  parse: makePFV('timeStamp', '>='),
}, {
  name: 'timeStamp_to',
  cql: 'timeStamp_to',
  values: [],
  parse: makePFV('timeStamp', '<='),
}, {
  // Value is injected from path-component by HarvestableJobsRoute's query function
  name: 'harvestableId',
  cql: 'harvestableId',
  values: [],
}];

const queryFunction = makeQueryFunction(
  'cql.allRecords=1',
  'name="%{query.query}*"', // XXX cannot yet add: 'or id="%{query.query}" or harvestableId="%{query.query}"',
  sortMap,
  filterConfig,
);

export default queryFunction;
