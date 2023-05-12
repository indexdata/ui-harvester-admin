import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup } from '@folio/stripes/components';

function SwitchRoute({ location, children }) {
  const today = new Date();
  const yesterday = new Date(today - 24 * 60 * 60 * 1000);
  const isoString = yesterday.toISOString().substring(0, 10);

  const segments = [{
    name: 'harvestables',
  }, {
    name: 'jobs',
  }, {
    name: 'records',
    params: `filters=timeStamp_from.${isoString}`,
  }];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5em' }}>
        <ButtonGroup data-test-navigation>
          {
            segments.map(({ name, params }) => {
              let effectiveTab = location.pathname.replace(/^\/ha\//, '').replace(/\/.*/, '');
              if (location.pathname.endsWith('/jobs')) effectiveTab = 'jobs';
              const selected = (effectiveTab === name);
              return (
                <Button
                  key={`${name}`}
                  to={`/ha/${name}${params ? `?${params}` : ''}`}
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
