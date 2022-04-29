// The representation of harvestables in the mod-harvester-admin
// web-service is referred to a "raw"; the form that is maintained in
// forms in this app is "cooked". The two functions exported from this
// file transform between the two representations.

import { booleanFields } from '../constants';


export function raw2cooked(raw) {
  const cooked = { ...raw };

  // mod-harvester-admin semantics are strange here: you are supposed
  // to send the `json` field as a string, but if it's valid then it
  // comes back as a parsed object. So we have to convert it back into
  // a string for editing.
  //
  if (raw.json && typeof raw.json === 'object') {
    cooked.json = JSON.stringify(cooked.json, null, 2);
  }

  // Acceptable values for `dateFormat` are:
  // yyyy-MM-dd
  // yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
  // (from localindices/harvester/src/main/java/com/indexdata/masterkey/localindices/harvest/storage/SolrRecordStorage.java:46)
  //
  // We represent this as a boolean: true if the long format is used, false if the short format
  cooked.dateFormat = (raw.dateFormat === "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

  ['usedBy', 'managedBy', 'mailAddress'].forEach(name => {
    cooked[name] = raw[name]?.split(/\s*,\s*/) || [];
  });

  cooked.constantFields = (raw.constantFields?.split(/\s*,\s*/) || []).map(s => {
    const pair = s.split('=');
    return { key: pair[0], value: pair[1] };
  });

  cooked.url = raw.url?.split(/\s+/) || [];

  booleanFields.forEach(tag => {
    if (raw[tag] !== undefined) {
      cooked[tag] = (raw[tag] === 'true');
    }
  });

  return cooked;
}


export function cooked2raw(cooked) {
  const raw = { ...cooked };

  raw.dateFormat = cooked.dateFormat ? "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" : 'yyyy-MM-dd';

  ['usedBy', 'managedBy', 'mailAddress'].forEach(name => {
    raw[name] = (cooked[name] || []).join(',');
  });

  raw.constantFields = (cooked.constantFields || []).map(x => `${x.key}=${x.value}`).join(',');

  raw.url = (cooked.url || []).join(' ');

  booleanFields.forEach(tag => {
    if (cooked[tag] !== undefined) {
      raw[tag] = cooked[tag] ? 'true' : 'false';
    }
  });

  return raw;
}
