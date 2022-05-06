import React from 'react';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Row, Col, TextField, InfoPopover } from '@folio/stripes/components';
import ListField from './ListField';

function translationTagAndHelpButton(intl, tag, i18nTag, helpTag) {
  const translationTag = `ui-harvester-admin.harvestables.field.${i18nTag || tag}`;
  const helpTranslationTag = `ui-harvester-admin.harvestables.field.${helpTag || i18nTag || tag}.help`;
  const helpMessage = intl.messages[helpTranslationTag];
  const helpButton =
    !helpMessage ?
      undefined :
      <InfoPopover content={<FormattedMessage id={helpTranslationTag} />} />;

  return [translationTag, helpButton];
}

// Col-Field
export const CF = ({ tag, i18nTag, helpTag, xs, ...rest }) => {
  const intl = useIntl();
  const [translationTag, helpButton] = translationTagAndHelpButton(intl, tag, i18nTag, helpTag);

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
  helpTag: PropTypes.string, // if defined, use this translation tag to find help text
  xs: PropTypes.number.isRequired,
};

// Row-Col-Field
export const RCF = (props) => (
  <Row>
    <CF {...props} xs={12} />
  </Row>
);

// Col-ListField
export const CLF = ({ tag, i18nTag, helpTag, xs, ...rest }) => {
  const intl = useIntl();
  const [translationTag, helpButton] = translationTagAndHelpButton(intl, tag, i18nTag, helpTag);

  return (
    <Col xs={xs}>
      <ListField
        id={`edit-harvestable-${tag}`}
        name={tag}
        label={<><FormattedMessage id={translationTag} /> {helpButton}</>}
        {...rest}
      />
    </Col>
  );
};

CLF.propTypes = CF.propTypes;

// Row-Col-ListField
export const RCLF = (props) => (
  <Row>
    <CLF {...props} xs={12} />
  </Row>
);
