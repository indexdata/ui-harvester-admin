import React from 'react';
import PropTypes from 'prop-types';
import { LoadingPane } from '@folio/stripes/components';
import ErrorMessage from '../components/ErrorMessage';
import HarvestableLogFailedRecords from './HarvestableLog/HarvestableLogFailedRecords';


function Records({
  data,
  error,
  hasLoaded,
}) {
  if (error) return <ErrorMessage message={error} />;
  if (!hasLoaded) return <LoadingPane />;

  // XXX For now. We will need to handle searching/filtering/sorting and paging
  return (
    <HarvestableLogFailedRecords
      failedRecords={{
        totalRecords: data.records.length,
        failedRecords: data.records,
      }}
    />
  );
}


Records.propTypes = {
  data: PropTypes.shape({
    records: PropTypes.arrayOf(
      PropTypes.shape({}).isRequired,
    ).isRequired,
  }).isRequired,
  error: PropTypes.string,
  hasLoaded: PropTypes.bool.isRequired,
};


export default Records;
