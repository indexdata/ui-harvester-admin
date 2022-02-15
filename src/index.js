import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { Route as NestedRoute } from '@folio/stripes/core';
import Settings from './settings';
import HarvesterAdminRoute from './routes/HarvesterAdminRoute';

class HarvesterAdminApp extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
    actAs: PropTypes.string.isRequired,
  };

  render() {
    const {
      actAs,
      match: { path }
    } = this.props;

    if (actAs === 'settings') {
      return <Settings {...this.props} />;
    }

    return (
      <Switch>
        <NestedRoute path={`${path}`} exact component={HarvesterAdminRoute} />
      </Switch>
    );
  }
}

export default HarvesterAdminApp;
