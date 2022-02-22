import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { Route as NestedRoute } from '@folio/stripes/core';
import Settings from './settings';
import SwitchRoute from './routes/SwitchRoute';
import HarvestablesRoute from './routes/HarvestablesRoute';
import StoragesRoute from './routes/StoragesRoute';

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
        <Redirect exact from={path} to={`${path}/harvestables`} />
        <NestedRoute path={`${path}`} component={SwitchRoute}>
          <Switch>
            <NestedRoute path={`${path}/harvestables`} exact component={HarvestablesRoute} />
            <NestedRoute path={`${path}/storages`} exact component={StoragesRoute} />
          </Switch>
        </NestedRoute>
      </Switch>
    );
  }
}

export default HarvesterAdminApp;
