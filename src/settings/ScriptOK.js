import React from 'react';
import PropTypes from 'prop-types';
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
    return <div className={css.badXML}>Bad XML: {errorMessage}</div>;
  }

  try {
    xsltProcessor.importStylesheet(xslStylesheet);
  } catch (e) {
    // No value to the exception: it's effectively a boolean (thrown or not)
    // The XML was not valid XSLT
    return <div className={css.badXSLT}>Valid XML, but not an XSLT stylesheet</div>;
  }

  return <div className={css.good}>Valid XSLT stylesheet</div>;
};

ScriptOK.propTypes = {
  xslText: PropTypes.string,
};

export default ScriptOK;
