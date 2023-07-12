import { sortBy } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { stripesConnect } from '@folio/stripes/core';
import { EntryManager } from '../smart-components';

import PipelineDetail from './PipelineDetail';
import PipelineForm from './PipelineForm';

const PERMS = {
  put: 'harvester-admin.transformations.item.put',
  post: 'harvester-admin.transformations.item.post',
  delete: 'harvester-admin.transformations.item.delete',
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
      onBeforeSave={values => {
        if (values.type) return values;
        return { ...values, type: 'basicTransformation' };
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
