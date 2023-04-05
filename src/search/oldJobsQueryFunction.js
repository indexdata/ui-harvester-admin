import { makeQueryFunction } from '@folio/stripes/smart-components';
import indexNames from './oldJobsIndexNames';

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
  indexNames
    .filter(n => n !== 'all' && n !== 'id' && n !== 'harvestableId' && n !== 'message' /* XXX for now */)
    .map(index => `${index}="%{query.query}*"`).join(' or '),
  sortMap,
  filterConfig,
);

export default oldJobsQueryFunction;
