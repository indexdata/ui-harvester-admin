import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import css from './ScriptOK.css';

const ScriptOK = ({ xslText }) => {
  if (xslText === '') {
    return null;
  }

  const parser = new DOMParser();
  const xsltProcessor = new XSLTProcessor();

  const xslStylesheet = parser.parseFromString(xslText, 'application/xml');
  const errorNode = xslStylesheet.querySelector('parsererror');
  if (errorNode) {
    let errorMessage = errorNode.textContent.trim();
    // This is often of the form:
    // XML Parsing Error: syntax error Location: http://localhost:3000/settings/ha/step/10010?layer=edit Line Number 1, Column 1
    errorMessage = errorMessage.replace(/Location: https?:[^ ]+/, '');
    return (
      <div className={css.badXML}>
        <FormattedMessage id="ui-harvester-admin.invalidXML" values={{ error: errorMessage }} />
      </div>
    );
  }

  try {
    xsltProcessor.importStylesheet(xslStylesheet);
  } catch (e) {
    // No value to the exception: it's effectively a boolean (thrown or not)
    // The XML was not valid XSLT
    return <div className={css.badXSLT}><FormattedMessage id="ui-harvester-admin.invalidXSLT" /></div>;
  }

  return <div className={css.good}><FormattedMessage id="ui-harvester-admin.validXSLT" /></div>;
};

ScriptOK.propTypes = {
  xslText: PropTypes.string,
};

export default ScriptOK;
