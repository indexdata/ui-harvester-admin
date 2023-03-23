import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import {} from '@folio/stripes/components';


const HarvestableLogsHeader = ({ harvestable }) => {
  return (
    <pre>
      {harvestable.message.replace(/ /g, '\n')}
    </pre>
  );
};


HarvestableLogsHeader.propTypes = {
  harvestable: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};


export default HarvestableLogsHeader;
