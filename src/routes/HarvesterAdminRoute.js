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

  if (!data) {
    okapiKy('harvester-admin/harvestables')
      .then(res => {
        console.log('success:', res);
        res.json().then(json => setData(json));
      }).catch(err => {
        console.log('failure:', err.toString());
        err.response.text().then(text => {
          setError(<><b>{err.toString()}</b>: {text}</>);
        });
      });

    return <LoadingPane />;
  }

  return (
    <>
      <h1>HarvesterAdmin route</h1>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </>
  );
};

export default HarvesterAdminRoute;
