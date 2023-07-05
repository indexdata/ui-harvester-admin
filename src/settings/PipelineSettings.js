import { sortBy } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { stripesConnect } from '@folio/stripes/core';
import { EntryManager } from '../smart-components';

import PipelineDetail from './PipelineDetail';
import PipelineForm from './StorageForm';

const PERMS = {
  put: 'harvester-admin.storages.item.put',
  post: 'harvester-admin.storages.item.post',
  delete: 'harvester-admin.storages.item.delete',
};

const PipelineSettings = (props) => {
  const { mutator, resources, intl } = props;

  return (
    <EntryManager
      {...props}
      resourcePath="harvester-admin/transformations"
      parentMutator={mutator}
      entryList={sortBy((resources.entries || {}).records || [], ['name'])}
      detailComponent={PipelineDetail}
      paneTitle={intl.formatMessage({ id: 'ui-harvester-admin.settings.pipeline' })}
      entryLabel={intl.formatMessage({ id: 'ui-harvester-admin.settings.pipeline.heading' })}
      entryFormComponent={PipelineForm}
      nameKey="name"
      permissions={PERMS}
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

PipelineSettings.propTypes = {
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

PipelineSettings.manifest = Object.freeze({
  entries: {
    type: 'okapi',
    records: 'transformations',
    path: 'harvester-admin/transformations',
    throwErrors: false,
  },
});

export default stripesConnect(injectIntl(PipelineSettings));
