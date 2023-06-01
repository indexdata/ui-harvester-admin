import makeQueryFunction from '../util/makeQueryFunction';

const sortMap = {
  // All the headings are the names of sortable fields
  // so no mapping is required.
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
  name: 'records_from',
  cql: 'records_from',
  values: [],
  parse: makePFV('amountHarvested', '>='),
}, {
  name: 'records_to',
  cql: 'records_to',
  values: [],
  parse: makePFV('amountHarvested', '<='),
}, {
  // Value is injected from path-component by HarvestableJobsRoute's query function
  name: 'harvestableId',
  cql: 'harvestableId',
  values: [],
}];

function queryFunction(defaultSearch, ...params) {
  // console.log('*** queryFunction');
  // console.log(`defaultSearch='${defaultSearch}'`);
  // console.log('params=', params);

  const fn = makeQueryFunction(
    'cql.allRecords=1',
    defaultSearch,
    sortMap,
    filterConfig,
    0,
    undefined,
    {
      rightTrunc: false,
    }
  );

  return fn(...params);
}

export default queryFunction;
