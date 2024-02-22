import React from 'react';
import { useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Button, ButtonGroup } from '@folio/stripes/components';

function SwitchRoute() {
  const location = useLocation();
  const stripes = useStripes();
  const today = new Date();
  const yesterday = new Date(today - 24 * 60 * 60 * 1000);
  const isoString = yesterday.toISOString().substring(0, 10);

  const segments = [{
    name: 'harvestables',
    perm: 'ui-harvester-admin.harvestables.view',
  }, {
    name: 'jobs',
    perm: 'ui-harvester-admin.jobs-and-failed-records.view',
    params: 'sort=-started'
  }, {
    name: 'records',
    perm: 'ui-harvester-admin.jobs-and-failed-records.view',
    params: `filters=timeStamp_from.${isoString}`,
  }, {
    name: 'mike',
    perm: 'ui-harvester-admin.harvestables.view',
  }];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5em' }}>
        <ButtonGroup data-test-navigation>
          {
            segments.filter(({ perm }) => stripes.hasPerm(perm)).map(({ name, params }) => {
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
    </>
  );
}

export default SwitchRoute;
