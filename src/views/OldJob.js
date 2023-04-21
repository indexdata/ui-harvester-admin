import React from 'react';
import PropTypes from 'prop-types';
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
      paneTitle={rec?.name}
    >
      <pre>{JSON.stringify(rec, null, 2)}</pre>
    </Pane>
  );
};

OldJob.propTypes = {
  defaultWidth: PropTypes.string,
  resources: PropTypes.shape({
    job: PropTypes.shape({
      hasLoaded: PropTypes.bool.isRequired,
      records: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
  mutator: PropTypes.shape({
    query: PropTypes.shape({
      update: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

export default OldJob;
