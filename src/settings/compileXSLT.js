const NO_TEXT = 1;
const BAD_XML = 2;
const BAD_XSLT = 3;
const GOOD_XSLT = 4;

// Tries to compile `xslText` into an XSLT processor configured with an executable stylesheet.
// Returns a tuple of [status, value].
// Status can be:
//      NO_TEXT -- text is empty, so there is no stylesheet to compile
//      BAD_XML -- text is provided but cannot be parsed as XML: value is error message
//      BAD_XSLT -- text is valid XML, but is not an XSLT stylesheet
//      GOOD_XSLT -- text is a valid XSLT stylesheet: value is the XSLT processor
// There is no value for the NO_TEXT and BAD_XSLT statuses.
//
function compileXSLT(xslText) {
  if (xslText === '') {
    return [NO_TEXT];
  }

  const parser = new DOMParser();

  const xslStylesheet = parser.parseFromString(xslText, 'application/xml');
  const errorNode = xslStylesheet.querySelector('parsererror');
  if (errorNode) {
    let errorMessage = errorNode.textContent.trim();
    // This is often of the form:
    // XML Parsing Error: syntax error Location: http://localhost:3000/settings/ha/step/10010?layer=edit Line Number 1, Column 1
    errorMessage = errorMessage.replace(/Location: https?:[^ ]+/, '');
    return [BAD_XML, errorMessage];
  }

  const xsltProcessor = new XSLTProcessor();
  try {
    xsltProcessor.importStylesheet(xslStylesheet);
  } catch (e) {
    // No value to the exception: it's effectively a boolean (thrown or not)
    return [BAD_XSLT];
  }

  return [GOOD_XSLT, xsltProcessor];
}

export { compileXSLT, NO_TEXT, BAD_XML, BAD_XSLT, GOOD_XSLT };
