import { sortBy } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { stripesConnect } from '@folio/stripes/core';
import { EntryManager } from '../smart-components';

import StorageDetail from './StorageDetail';
import StorageForm from './StorageForm';

const StorageSettings = (props) => {
  const { mutator, resources, intl } = props;

  return (
    <EntryManager
      {...props}
      resourcePath="harvester-admin/storages"
      parentMutator={mutator}
      entryList={sortBy((resources.entries || {}).records || [], ['name'])}
      detailComponent={StorageDetail}
      paneTitle={intl.formatMessage({ id: 'ui-harvester-admin.settings.storage' })}
      entryLabel={intl.formatMessage({ id: 'ui-harvester-admin.settings.storage.heading' })}
      entryFormComponent={StorageForm}
      nameKey="name"
      permissions={{
        // XXX Change these when we resolve the permissions plan for Harvester Admin
        put: 'inventory-storage.instances.collection.get',
        post: 'inventory-storage.instances.collection.get',
        delete: 'inventory-storage.instances.collection.get',
      }}
      enableDetailsActionMenu
      parseInitialValues={values => {
        if (!values.json) return values;
        return { ...values, json: JSON.stringify(values.json, null, 2) };
      }}
      onBeforeSave={values => {
        if (!values.json) return values;
        return { ...values, json: JSON.parse(values.json) };
      }}
    />
  );
};

StorageSettings.propTypes = {
  resources: PropTypes.shape({
    entries: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
  mutator: PropTypes.shape({
    entries: PropTypes.shape({
      POST: PropTypes.func,
      PUT: PropTypes.func,
      DELETE: PropTypes.func,
    }),
  }).isRequired,
  intl: PropTypes.object.isRequired,
};

StorageSettings.manifest = Object.freeze({
  entries: {
    type: 'okapi',
    records: 'storages',
    path: 'harvester-admin/storages',
    throwErrors: false,
  },
});

export default stripesConnect(injectIntl(StorageSettings));
