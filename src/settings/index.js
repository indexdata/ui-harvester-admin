import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';
import StorageSettings from './StorageSettings';
import PipelineSettings from './PipelineSettings';
import StepSettings from './StepSettings';
import LogSettings from './LogSettings';

const HarvesterAdminSettings = (props) => {
  const pages = [
    {
      route: 'storage',
      label: <FormattedMessage id="ui-harvester-admin.settings.storage" />,
      component: StorageSettings,
      // perm: 'XXX',
    },
    {
      route: 'pipeline',
      label: <FormattedMessage id="ui-harvester-admin.settings.pipeline" />,
      component: PipelineSettings,
      // perm: 'XXX',
    },
    {
      route: 'step',
      label: <FormattedMessage id="ui-harvester-admin.settings.step" />,
      component: StepSettings,
      // perm: 'XXX',
    },
    {
      route: 'logs',
      label: <FormattedMessage id="ui-harvester-admin.settings.logs" />,
      component: LogSettings,
      // perm: 'XXX',
    },
  ];

  return (
    <Settings {...props} pages={pages} paneTitle={<FormattedMessage id="ui-harvester-admin.meta.title" />} />
  );
};

export default HarvesterAdminSettings;
