import React from 'react';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import { MultiColumnList, Accordion, NoValue } from '@folio/stripes/components';
import { message2stats, summarizeStats } from '../../util/message2stats';


const HarvestableLogHeader = ({ record }) => {
  const intl = useIntl();
  const stats = message2stats(record.message);

  const visibleColumns = ['summary', 'instances', 'holdings', 'items'];

  const columnMapping = {
    summary: <FormattedMessage id="ui-harvester-admin.summary-table.summary" />,
    instances: <FormattedMessage id="ui-harvester-admin.summary-table.instances" />,
    holdings: <FormattedMessage id="ui-harvester-admin.summary-table.holdings" />,
    items: <FormattedMessage id="ui-harvester-admin.summary-table.items" />,
  };

  const contentData = !stats ? [] : ['processed', 'loaded', 'deleted', 'failed'].map(caption => {
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
        <h3>Message</h3>
        <pre>
          {record.message?.replace(/^\s+/, '').replace(/ /g, '\n') || <NoValue />}
        </pre>
        <h3>Summary</h3>
        <pre>
          {summarizeStats(intl, record.message)}
        </pre>
        <h3>Compiled stats</h3>
        <pre>
          {JSON.stringify(stats, null, 2) || <NoValue />}
        </pre>
      </Accordion>
    </>
  );
};


HarvestableLogHeader.propTypes = {
  record: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
};


export default HarvestableLogHeader;