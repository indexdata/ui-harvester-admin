// eslint-disable-next-line import/prefer-default-export
export const booleanFields = [
  // General section
  'openAccess', 'enabled', 'laxParsing', 'cacheEnabled', 'storeOriginal',
  // OAI-PMH section
  'clearRtOnError', 'keepPartial',
  // XML Bulk section
  'allowErrors', 'overwrite', 'allowCondReq', 'recurse', 'passiveMode',
  // Connector section
  // 'overwrite', 'allowErrors' both already included in XML Bulk section
];
