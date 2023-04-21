import React from 'react';
import { Loading, Pane } from '@folio/stripes/components';
import packageInfo from '../../package';

const OldJob = ({ defaultWidth, resources, mutator }) => {
  const resource = resources.job;
  if (!resource.hasLoaded) return <Loading />;
  const rec = resource.records[0];

  const returnToList = () => mutator.query.update({ _path: `${packageInfo.stripes.route}/jobs` });

  return (
    <Pane
      dismissible
      onClose={returnToList}
      defaultWidth={defaultWidth}
      paneTitle={resource.records[0]?.name}
    >
      <pre>{JSON.stringify(rec, null, 2)}</pre>
    </Pane>
  );
};

export default OldJob;
