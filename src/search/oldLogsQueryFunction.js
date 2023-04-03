import { makeQueryFunction } from '@folio/stripes/smart-components';
import indexNames from './oldLogsIndexNames';
import sortMap from './oldLogsSortMap';
import filterConfig from './oldLogsFilterConfig';

const oldLogsqueryFunction = makeQueryFunction(
  'cql.allRecords=1',
  indexNames
    .filter(n => n !== 'all' && n !== 'id' && n !== 'harvestableId' && n !== 'message' /* XXX for now */)
    .map(index => `${index}="%{query.query}*"`).join(' or '),
  sortMap,
  filterConfig,
);

export default oldLogsqueryFunction;
