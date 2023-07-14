// Translates all the specified boolean fieds in the object from
// strings "true" or "false" to boolean values true and false.

function boolValues2string(obj, booleanFields) {
  const newObj = { ...obj };
  booleanFields.forEach(field => {
    newObj[field] = (obj[field] === 'true');
  });
  return newObj;
}

function stringValues2bool(obj, booleanFields) {
  const newObj = { ...obj };
  booleanFields.forEach(field => {
    newObj[field] = (obj[field] === true) ? 'true' : 'false';
  });
  return newObj;
}

function bool2display(val) {
  return val ? '✅' : '❌';
}

export { boolValues2string, stringValues2bool, bool2display };
