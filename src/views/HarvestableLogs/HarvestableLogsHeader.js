import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { MultiColumnList, Accordion } from '@folio/stripes/components';
import message2stats from '../../util/message2stats';


const HarvestableLogsHeader = ({ harvestable }) => {
  const stats = message2stats(harvestable.message);

  const visibleColumns = ['summary', 'source', 'instances', 'holdings', 'items'];

  const columnMapping = {
    summary: <FormattedMessage id="ui-harvester-admin.summary-table.summary" />,
    source: <FormattedMessage id="ui-harvester-admin.summary-table.source" />,
    instances: <FormattedMessage id="ui-harvester-admin.summary-table.instances" />,
    holdings: <FormattedMessage id="ui-harvester-admin.summary-table.holdings" />,
    items: <FormattedMessage id="ui-harvester-admin.summary-table.items" />,
  };

  const contentData = ['processed', 'loaded', 'deleted', 'failed'].map(caption => {
    const values = {
      summary: <FormattedMessage id={`ui-harvester-admin.summary-label.${caption}`} />,
    };
    visibleColumns.slice(1).forEach(col => {
      values[col] = stats[col]?.[caption];
    });
    return values;
  });

  const resultsFormatter = {};

  return (
    <>
      <MultiColumnList
        id="harvest-summary-table"
        columnIdPrefix="harvest-summary-table"
        visibleColumns={visibleColumns}
        columnMapping={columnMapping}
        columnWidths={{}}
        contentData={contentData}
        formatter={resultsFormatter}
      />
      <Accordion
        id="harvest-summary-devinfo"
        label={<FormattedMessage id="ui-harvester-admin.accordion.devinfo" />}
        closedByDefault
      >
        <pre>
          {harvestable.message.replace(/ /g, '\n')}
          <br />
          <br />
          {JSON.stringify(stats, null, 2)}
        </pre>
      </Accordion>
    </>
  );
};


HarvestableLogsHeader.propTypes = {
  harvestable: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};


export default HarvestableLogsHeader;
