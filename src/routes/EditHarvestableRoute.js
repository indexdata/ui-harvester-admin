import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { stripesConnect } from '@folio/stripes/core';
import HarvestableForm from '../forms/HarvestableForm';
import { booleanFields } from '../constants';
import packageInfo from '../../package';


function raw2cooked(raw) {
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
  cooked.dateFormat = (cooked.dateFormat === "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

  cooked.mailAddress = cooked.mailAddress?.split(/\s*,\s*/) || [];

  cooked.constantFields = (cooked.constantFields?.split(/\s*,\s*/) || []).map(s => {
    const pair = s.split('=');
    return { key: pair[0], value: pair[1] };
  });

  cooked.url = raw.url?.split(/\s+/) || [];

  booleanFields.forEach(tag => {
    if (cooked[tag] !== undefined) {
      cooked[tag] = (cooked[tag] === 'true');
    }
  });

  return cooked;
}


function cooked2raw(cooked) {
  const raw = { ...cooked };

  booleanFields.forEach(tag => {
    if (raw[tag] !== undefined) {
      raw[tag] = raw[tag] ? 'true' : 'false';
    }
  });

  raw.dateFormat = raw.dateFormat ? "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" : 'yyyy-MM-dd';

  raw.mailAddress = raw.mailAddress.join(',');

  raw.constantFields = raw.constantFields.map(x => `${x.key}=${x.value}`).join(',');

  raw.url = cooked.url.join(' ');

  return raw;
}


const EditHarvestableRoute = ({ resources, mutator, match }) => {
  const handleClose = () => {
    mutator.query.update({ _path: `${packageInfo.stripes.route}/harvestables/${match.params.recId}` });
  };

  const handleSubmit = (record) => {
    mutator.harvestable.PUT(cooked2raw(record))
      .then(handleClose);
  };

  const isLoading = (resources.harvestable.isPending ||
                     resources.transformationPipelines.isPending ||
                     resources.storageEngines.isPending);

  return (
    <HarvestableForm
      isLoading={isLoading}
      initialValues={raw2cooked(get(resources, 'harvestable.records[0]', {}))}
      data={{
        transformationPipelines: resources.transformationPipelines.records,
        storageEngines: resources.storageEngines.records,
      }}
      handlers={{ onClose: handleClose }}
      onSubmit={handleSubmit}
    />
  );
};


EditHarvestableRoute.manifest = Object.freeze({
  query: {},
  harvestable: {
    type: 'okapi',
    path: 'harvester-admin/harvestables/:{recId}',
  },
  transformationPipelines: {
    type: 'okapi',
    path: 'harvester-admin/transformations',
    records: 'transformations',
  },
  storageEngines: {
    type: 'okapi',
    path: 'harvester-admin/storages',
    records: 'storages',
  },
});


EditHarvestableRoute.propTypes = {
  resources: PropTypes.shape({
    harvestable: PropTypes.shape({
      isPending: PropTypes.bool.isRequired,
      records: PropTypes.arrayOf(
        PropTypes.shape({}).isRequired,
      ).isRequired,
    }).isRequired,
    transformationPipelines: PropTypes.shape({
      isPending: PropTypes.bool.isRequired,
      records: PropTypes.arrayOf(
        PropTypes.shape({}).isRequired,
      ).isRequired,
    }).isRequired,
    storageEngines: PropTypes.shape({
      isPending: PropTypes.bool.isRequired,
      records: PropTypes.arrayOf(
        PropTypes.shape({}).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
  mutator: PropTypes.shape({
    query: PropTypes.shape({
      update: PropTypes.func.isRequired,
    }).isRequired,
    harvestable: PropTypes.shape({
      PUT: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};


export default stripesConnect(EditHarvestableRoute);
