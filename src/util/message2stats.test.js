import { message2stats } from './message2stats';


const testCases = [
  {
    name: 'empty message',
    input: '',
    expected: {}
  },
  {
    name: 'old format',
    input: '  Instances_processed/loaded/deletions(signals)/failed:__255___0___0(0)___255_ Holdings_records_processed/loaded/deleted/failed:__351___0___0___0_ Items_processed/loaded/deleted/failed:__274___0___0___0_ Source_records_processed/loaded/deleted/failed:__0___0___21___0_',
    expected: {
      instances: { processed: '255', loaded: '0', deleted: '0(0)', failed: '255' },
      holdings: { processed: '351', loaded: '0', deleted: '0', failed: '0' },
      items: { processed: '274', loaded: '0', deleted: '0', failed: '0', },
      source: { processed: '0', loaded: '0', deleted: '21', failed: '0' }
    },
  },
  {
    name: 'new format',
    input: '  Instances_processed/loaded/deleted(skipped)/failed:__500___500___0(0)___0_ Holdings_records_processed/loaded/deleted(skipped)/failed:__572___485___0(0)___87_ Items_processed/loaded/deleted(skipped)/failed:__514___514___0(0)___0_',
    expected: {
      instances: { processed: '500', loaded: '500', deleted: '0(0)', failed: '0' },
      holdings: { processed: '572', loaded: '485', deleted: '0(0)', failed: '87' },
      items: { processed: '514', loaded: '514', deleted: '0(0)', failed: '0', },
    }
  },
  {
    name: 'made-up format',
    input: 'FooBar_whatever:_1_2_baz_4 QUUX_ignore/this:_5______67(2)_7_8888888',
    expected: {
      quux: { processed: '5', loaded: '67(2)', deleted: '7', failed: '8888888' },
      foobar: { processed: '1', loaded: '2', deleted: 'baz', failed: '4' },
    }
  }
];


for (let i = 0; i < testCases.length; i++) {
  const testCase = testCases[i];

  test(`parses ${testCase.name} stats message`, () => {
    const stats = message2stats(testCase.input);

    for (const key in testCase.expected) {
      const expectedEntry = testCase.expected[key];

      // Each expected entry should be in the parsed stats
      expect(stats[key]).toBeDefined();

      const entry = stats[key];
      for (const status in expectedEntry) {
        // Each expected status should be in the parsed entry
        expect(entry[status]).toBeDefined();

        expect(entry[status]).toBe(expectedEntry[status]);

        delete entry[status]
      }

      // Should be no extra statuses in the parsed entry beyond those expected
      expect(Object.keys(entry).length).toBe(0);

      delete stats[key];
    }

    // Should be no extra entries in the parsed stats beyond those expected
    expect(Object.keys(stats).length).toBe(0);
  });
}
