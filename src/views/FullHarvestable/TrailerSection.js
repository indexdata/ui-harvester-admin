import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Accordion, Row } from '@folio/stripes/components';
import { RCKV, CKV } from '../../components/CKV';

const TrailerSection = ({ rec }) => (
  <Accordion
    id="harvestable-section-general"
    label={<FormattedMessage id="ui-harvester-admin.harvestables.heading.status" />}
  >
    <Row>
      <CKV rec={rec} tag="currentStatus" xs={6} />
      <CKV rec={rec} tag="initiallyHarvested" xs={6} />
    </Row>
    <Row>
      <CKV rec={rec} tag="lastHarvestStarted" xs={6} />
      <CKV rec={rec} tag="lastHarvestFinished" xs={6} />
    </Row>
    <RCKV rec={rec} tag="lastUpdated" />
  </Accordion>
);

TrailerSection.propTypes = {
  rec: PropTypes.object.isRequired,
};

export default TrailerSection;
