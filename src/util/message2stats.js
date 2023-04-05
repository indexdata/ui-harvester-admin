function message2stats(message) {
  if (!message) return undefined;

  const stats = {};
  message.split(' ').forEach(row => {
    const matchData = row.match(/(.*?)_.*:_+([^_]*)_+([^_]*)_+([^_]*)_+([^_]*)/);
    if (matchData) {
      // eslint-disable-next-line no-unused-vars
      const [_matched, name, processed, loaded, deleted, failed] = matchData;
      stats[name.toLowerCase()] = { processed, loaded, deleted, failed };
    } else {
      // eslint-disable-next-line no-console
      console.warn('message2stats: no match for row:', row);
    }
  });

  return stats;
}

/*
const message = 'Instances_processed/loaded/deletions(signals)/failed:__0___0___0(0)___0_ Holdings_records_processed/loaded/deleted/failed:__107___0___0___107_ Items_processed/loaded/deleted/failed:__107___0___0___0_ Source_records_processed/loaded/deleted/failed:__0___0___0___0_';

const stats = message2stats(message);
console.log(stats);
*/

export { message2stats };
