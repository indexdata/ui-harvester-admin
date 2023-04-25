import React from 'react';
import PropTypes from 'prop-types';
// import { useIntl, FormattedMessage } from 'react-intl';
// import { AppIcon } from '@folio/stripes/core';
import { LoadingPane } from '@folio/stripes/components';
// import { LoadingPane, Paneset, Pane, MultiColumnList, ErrorModal } from '@folio/stripes/components';
// import { ColumnManager, SearchAndSortQuery } from '@folio/stripes/smart-components';
// import parseSort from '../util/parseSort';
// import formatDateTime from '../util/formatDateTime';
// import { message2stats, summarizeStats } from '../util/message2stats';
// import RecordsSearchPane from '../search/JobsSearchPane';
import ErrorMessage from '../components/ErrorMessage';
import HarvestableLogFailedRecords from './HarvestableLog/HarvestableLogFailedRecords';
// import packageInfo from '../../package';


function Records({
  data,
  // query,
  // resultCount,
  // updateQuery,
  error,
  hasLoaded,
  // onNeedMoreData,
  // children,
}) {
  // const intl = useIntl();
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
      PropTypes.shape({
        // XXX fill in
      }).isRequired,
    ).isRequired,
  }).isRequired,
  // query: PropTypes.object.isRequired,
  // resultCount: PropTypes.number,
  // updateQuery:PropTypes.func.isRequired,
  error: PropTypes.string,
  hasLoaded: PropTypes.bool.isRequired,
  // onNeedMoreData: PropTypes.func.isRequired,
  // children: PropTypes.oneOfType([
  //   PropTypes.object.isRequired,
  //   PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  // ]),
};


export default Records;
