import { sortBy } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { useStripes, stripesConnect } from '@folio/stripes/core';
import { EntryManager } from '../smart-components';

import StorageDetail from './StorageDetail';
import StorageForm from './StorageForm';

const PERMS = {
  put: 'harvester-admin.storages.item.put',
  post: 'harvester-admin.storages.item.post',
  delete: 'harvester-admin.storages.item.delete',
};

const StorageSettings = (props) => {
  const { mutator, resources, intl } = props;
  const stripes = useStripes();

  // When this is disabled <EntryManager> displays an Edit button, which there is no way to remove. See STSMACOM-764
  const enableDetailsActionMenu = stripes.hasPerm(PERMS.put) || stripes.hasPerm(PERMS.post) || stripes.hasPerm(PERMS.delete);

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
      permissions={PERMS}
      enableDetailsActionMenu={enableDetailsActionMenu}
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
