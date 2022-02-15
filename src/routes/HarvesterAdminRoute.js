import React, { useState } from 'react';
import { useOkapiKy } from '@folio/stripes/core';
import { LoadingPane } from '@folio/stripes/components';
import ErrorMessage from '../util/ErrorMessage';

const HarvesterAdminRoute = () => {
  const okapiKy = useOkapiKy();
  const [data, setData] = useState();
  const [error, setError] = useState();

  if (error) {
    return <ErrorMessage message={error} />;
  }

  okapiKy('harvester-admin/harvestables')
    .then(res => {
      console.log('success:', res);
      setData(res);
    }).catch(err => {
      console.log('failure:', err.toString());
      err.response.text().then(text => {
        setError(<><b>{err.toString()}</b>: {text}</>);
      });
    });

  if (!data) {
    return <LoadingPane />;
  }

  return 'HarvesterAdmin route';
};

export default HarvesterAdminRoute;
