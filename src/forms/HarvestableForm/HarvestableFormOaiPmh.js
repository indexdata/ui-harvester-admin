import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import OaiPmh from '@indexdata/oai-pmh';
import { Accordion, Row, Checkbox, Datepicker, Select } from '@folio/stripes/components';
import { RCF, CF } from '../../components/CF';

const HarvestableFormOaiPmh = ({ values }) => {
  const [sets, setSets] = useState();
  useEffect(() => {
    async function fetchOaiPmhData() {
      const oaiPhm = new OaiPmh(values.url);
      let setsResponse;
      try {
        setsResponse = await oaiPhm.listSets();
      } catch (err) {
        // It would be nice to do something cleverer here
        // eslint-disable-next-line no-console
        console.error('OAI-PMH oops!', err);
        return;
      }
      setSets(setsResponse.ListSets[0].set.map(x => ({
        value: x.setSpec[0],
        label: `${x.setName} (${x.setSpec[0]})`,
      })));
    }
    fetchOaiPmhData();
  }, [values.url]);

  return (
    <Accordion
      id="harvestable-form-oai"
      label={<FormattedMessage id="ui-harvester-admin.harvestables.field.type.oaiPmh" />}
    >
      <RCF tag="url" />
      <RCF tag="oaiSetName" component={Select} dataOptions={sets} />
      <RCF tag="metadataPrefix" />
      <RCF tag="dateFormat" i18nTag="useLongDateFormat" component={Checkbox} type="checkbox" />
      <Row>
        <CF tag="fromDate" xs={6} component={Datepicker} />
        <CF tag="untilDate" xs={6} component={Datepicker} />
      </Row>
      <RCF tag="resumptionToken" />
      <RCF tag="clearRtOnError" component={Checkbox} type="checkbox" />
      <RCF tag="keepPartial" component={Checkbox} type="checkbox" />
      <Row>
        <CF tag="retryCount" xs={6} />
        <CF tag="retryWait" xs={6} />
      </Row>
    </Accordion>
  );
};

HarvestableFormOaiPmh.propTypes = {
  values: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default HarvestableFormOaiPmh;
