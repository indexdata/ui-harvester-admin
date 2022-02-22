import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup } from '@folio/stripes/components';

const segments = ['harvestables', 'storages'];

function SwitchRoute({ location, children }) {
  return (
    <>
      <ButtonGroup data-test-navigation>
        {
          segments.map(name => (
            <Button
              key={`${name}`}
              to={`/ha/${name}`}
              buttonStyle={`${location.pathname === `/ha/${name}` ? 'primary' : 'default'}`}
              aria-selected={location.pathname === `/ha/${name}`}
            >
              <FormattedMessage id={`ui-harvester-admin.nav.${name}`} />
            </Button>
          ))
        }
      </ButtonGroup>
      <hr />
      { children }
    </>
  );
}

SwitchRoute.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.object.isRequired,
};

export default SwitchRoute;
