function parseSort(sort) {
  if (sort === undefined || sort === '') return [];
  return sort.split(',').map(s => (
    s.startsWith('-') ?
      { key: s.substring(1), descending: true } :
      { key: s, descending: false }
  ));
}

export default parseSort;
