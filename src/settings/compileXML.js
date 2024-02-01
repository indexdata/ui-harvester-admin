// Return a tuple of [parsedDoc, errorString]
// If and only if parsedDoc is undefined, errorString is valid
//
function compileXML(xmlText) {
  const parser = new DOMParser();

  const xmlDom = parser.parseFromString(xmlText, 'application/xml');
  const errorNode = xmlDom.querySelector('parsererror');
  if (errorNode) {
    let errorMessage = errorNode.textContent.trim();
    // This is often of the form:
    // XML Parsing Error: syntax error Location: http://localhost:3000/settings/ha/step/10010?layer=edit Line Number 1, Column 1
    errorMessage = errorMessage.replace(/Location: https?:[^ ]+/, '');
    return [undefined, errorMessage];
  }

  return [xmlDom];
}

export default compileXML;
