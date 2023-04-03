const oldLogsFilterConfig = [{
  name: 'status',
  cql: 'status',
  values: [],
}, {
  name: 'type',
  cql: 'type',
  values: [],
}, {
  // Value is injected from path-component by HarvestableOldLogsRoute's query function
  name: 'harvestableId',
  cql: 'harvestableId',
  values: [],
}];


export default oldLogsFilterConfig;
