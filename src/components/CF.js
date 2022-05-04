import React from 'react';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Row, Col, TextField, InfoPopover } from '@folio/stripes/components';
import ListField from './ListField';

function translationTagAndHelpButton(intl, tag, i18nTag) {
  const translationTag = `ui-harvester-admin.harvestables.field.${i18nTag || tag}`;
  const helpTranslationTag = `${translationTag}.help`;
  const helpMessage = intl.messages[helpTranslationTag];
  const helpButton =
    (!helpMessage || helpMessage === 'XXX') ?
      undefined :
      <InfoPopover content={<FormattedMessage id={helpTranslationTag} />} />;

  return [translationTag, helpButton];
}

// Col-Field
export const CF = ({ tag, i18nTag, xs, ...rest }) => {
  const intl = useIntl();
  const [translationTag, helpButton] = translationTagAndHelpButton(intl, tag, i18nTag);

  return (
    <Col xs={xs}>
      <Field
        id={`edit-harvestable-${tag}`}
        name={tag}
        label={<><FormattedMessage id={translationTag} /> {helpButton}</>}
        component={TextField}
        {...rest}
      />
    </Col>
  );
};

CF.propTypes = {
  tag: PropTypes.string.isRequired,
  i18nTag: PropTypes.string, // if defined, use this translation tag instead of `tag`
  xs: PropTypes.number.isRequired,
};

// Row-Col-Field
export const RCF = (props) => (
  <Row>
    <CF {...props} xs={12} />
  </Row>
);

// Col-ListField
export const CLF = ({ tag, i18nTag, xs, ...rest }) => (
  <Col xs={xs}>
    <ListField
      id={`edit-harvestable-${tag}`}
      name={tag}
      label={<FormattedMessage id={`ui-harvester-admin.harvestables.field.${i18nTag || tag}`} />}
      {...rest}
    />
  </Col>
);

CLF.propTypes = CF.propTypes;

// Row-Col-ListField
export const RCLF = (props) => (
  <Row>
    <CLF {...props} xs={12} />
  </Row>
);
