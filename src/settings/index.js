import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';
import NullSettings from './NullSettings';

const HarvesterAdminSettings = (props) => {
  const pages = [
    {
      route: 'null-settings',
      label: <FormattedMessage id="ui-harvester-admin.settings.nullSettings" />,
      component: NullSettings,
    },
  ];

  return (
    <Settings {...props} pages={pages} paneTitle={<FormattedMessage id="ui-harvester-admin.meta.title" />} />
  );
};

export default HarvesterAdminSettings;
