import React from 'react';
import PropTypes from 'prop-types';

const ScriptOK = ({ xslText }) => {
  if (xslText === '') {
    return null;
  }

  const parser = new DOMParser();
  const xsltProcessor = new XSLTProcessor();

  console.log('xslText =', xslText);
  const xslStylesheet = parser.parseFromString(xslText, 'application/xml');
  const errorNode = xslStylesheet.querySelector('parsererror');
  if (errorNode) {
    let errorMessage = errorNode.textContent;
    console.log('untrimmed =', errorMessage);
    errorMessage = errorMessage.trim();
    console.log('trimmed =', errorMessage);
    // This is often of the form:
    // XML Parsing Error: syntax error Location: http://localhost:3000/settings/ha/step/10010?layer=edit Line Number 1, Column 1
    errorMessage = errorMessage.replace(/Location: https?:[^ ]+/, '');
    return 'Bad XML: ' + errorMessage;
  }

  console.log('xslStylesheet =', xslStylesheet);
  try {
    xsltProcessor.importStylesheet(xslStylesheet);
  } catch (e) {
    // No value to the exception: it's effectively a boolean (thrown or not)
    // The XML was not valid XSLT
    return 'Bad XSLT';
  }
  return 'Good XSLT';
};

ScriptOK.propTypes = {
  xslText: PropTypes.string,
};

export default ScriptOK;
