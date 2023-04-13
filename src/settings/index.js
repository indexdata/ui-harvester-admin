import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';
import StorageSettings from './StorageSettings';
import PipelineSettings from './PipelineSettings';
import StepSettings from './StepSettings';

const HarvesterAdminSettings = (props) => {
  const pages = [
    {
      route: 'storage',
      label: <FormattedMessage id="ui-harvester-admin.settings.storage" />,
      component: StorageSettings,
      perm: 'ui-harvester-admin.settings.storage',
    },
    {
      route: 'pipeline',
      label: <FormattedMessage id="ui-harvester-admin.settings.pipeline" />,
      component: PipelineSettings,
      perm: 'ui-harvester-admin.settings.pipeline',
    },
    {
      route: 'step',
      label: <FormattedMessage id="ui-harvester-admin.settings.step" />,
      component: StepSettings,
      perm: 'ui-harvester-admin.settings.step',
    },
  ];

  return (
    <Settings {...props} pages={pages} paneTitle={<FormattedMessage id="ui-harvester-admin.meta.title" />} />
  );
};

export default HarvesterAdminSettings;
