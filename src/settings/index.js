import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';

import NullSettings from './NullSettings';

export default class HarvesterAdminSettings extends React.Component {
  pages = [
    {
      route: 'null-settings',
      label: <FormattedMessage id="ui-harvester-admin.settings.nullSettings" />,
      component: NullSettings,
    },
  ];

  render() {
    return (
      <Settings {...this.props} pages={this.pages} paneTitle={<FormattedMessage id="ui-harvester-admin.meta.title" />} />
    );
  }
}
