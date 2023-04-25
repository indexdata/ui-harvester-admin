import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { Route as NestedRoute } from '@folio/stripes/core';
import Settings from './settings';
import SwitchRoute from './routes/SwitchRoute';
import HarvestablesRoute from './routes/HarvestablesRoute';
import CreateHarvestableRoute from './routes/CreateHarvestableRoute';
import FullHarvestableRoute from './routes/FullHarvestableRoute';
import EditHarvestableRoute from './routes/EditHarvestableRoute';
import HarvestableLogRoute from './routes/HarvestableLogRoute';
import HarvestableJobsRoute from './routes/HarvestableJobsRoute';
import JobsRoute from './routes/JobsRoute';
import FullJobRoute from './routes/FullJobRoute';
import RecordsRoute from './routes/RecordsRoute';

const HarvesterAdminApp = (props) => {
  const {
    actAs,
    match: { path }
  } = props;

  if (actAs === 'settings') {
    return <Settings {...props} />;
  }

  return (
    <Switch>
      <Redirect exact from={path} to={`${path}/harvestables`} />
      <NestedRoute path={`${path}`} component={SwitchRoute}>
        <Switch>
          <NestedRoute path={`${path}/harvestables/create/:type`} exact component={CreateHarvestableRoute} />
          <NestedRoute path={`${path}/harvestables/:recId/logs`} exact component={HarvestableLogRoute} />
          <NestedRoute path={`${path}/harvestables/:recId/jobs`} exact component={HarvestableJobsRoute} />
          <NestedRoute path={`${path}/harvestables`} component={HarvestablesRoute}>
            <NestedRoute path={`${path}/harvestables/:recId`} exact component={FullHarvestableRoute} />
            <NestedRoute path={`${path}/harvestables/:recId/edit`} exact component={EditHarvestableRoute} />
          </NestedRoute>
          <NestedRoute path={`${path}/jobs`} component={JobsRoute}>
            <NestedRoute path={`${path}/jobs/:recId`} exact component={FullJobRoute} />
          </NestedRoute>
          <NestedRoute path={`${path}/records`} component={RecordsRoute} />
        </Switch>
      </NestedRoute>
    </Switch>
  );
};

HarvesterAdminApp.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  actAs: PropTypes.string.isRequired,
};

export default HarvesterAdminApp;
