import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ObjectInspector from 'react-inspector';
import { Accordion } from '@folio/stripes/components';


const HarvestableLogsFailedRecords = ({ failedRecords }) => {
  return (
    <Accordion
      id="harvestable-logs-failed"
      label={<FormattedMessage id="ui-harvester-admin.logs.failedRecords" />}
    >
      <ObjectInspector
        data={failedRecords}
        expandLevel={2}
        sortObjectKeys
      />
    </Accordion>
  );
};


HarvestableLogsFailedRecords.propTypes = {
  failedRecords: PropTypes.shape({
    totalRecords: PropTypes.number.isRequired,
    failedRecords: PropTypes.arrayOf(
      PropTypes.shape({
        // XXX add individual fields
      }).isRequired,
    ).isRequired,
  }),
};


export default HarvestableLogsFailedRecords;
