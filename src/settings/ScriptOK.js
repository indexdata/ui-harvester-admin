import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { compileXSLT, NO_TEXT, BAD_XML, BAD_XSLT } from './compileXSLT';
import css from './ScriptOK.css';

const ScriptOK = ({ xslText }) => {
  const [status, value] = compileXSLT(xslText);

  if (status === NO_TEXT) {
    return null;
  } else if (status === BAD_XML) {
    return <div className={css.badXML}><FormattedMessage id="ui-harvester-admin.invalidXML" values={{ error: value }} /></div>;
  } else if (status === BAD_XSLT) {
    return <div className={css.badXSLT}><FormattedMessage id="ui-harvester-admin.invalidXSLT" /></div>;
  }

  // It's good XSLT
  return <div className={css.good}><FormattedMessage id="ui-harvester-admin.validXSLT" /></div>;
};

ScriptOK.propTypes = {
  xslText: PropTypes.string,
};

export default ScriptOK;
