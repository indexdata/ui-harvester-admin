import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup } from '@folio/stripes/components';

const segments = ['harvestables', 'jobs'];

function SwitchRoute({ location, children }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5em' }}>
        <ButtonGroup data-test-navigation>
          {
            segments.map(name => {
              let effectiveTab = location.pathname.replace(/^\/ha\//, '').replace(/\/.*/, '');
              if (location.pathname.endsWith('/jobs')) effectiveTab = 'jobs';
              const selected = (effectiveTab === name);
              return (
                <Button
                  key={`${name}`}
                  to={`/ha/${name}`}
                  buttonStyle={selected ? 'primary' : 'default'}
                  aria-selected={selected}
                >
                  <FormattedMessage id={`ui-harvester-admin.nav.${name}`} />
                </Button>
              );
            })
          }
        </ButtonGroup>
      </div>
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
