import { errors2string } from './summarizeErrors';

const errorFromMessage = `[
  {
    "error": {
      "label": "Error encountered during upsert of Inventory record set",
      "message": "ERROR: Cannot update record c352fe11-51e2-4e8b-87d6-578d6dedec8b because it has been changed (optimistic locking): Stored _version is 4, _version of request is 1 (23F09)"
    }
  }
]`;

const errorFromLabel = `[
  {
    "error": {
      "label": "Error encountered during upsert of Inventory record set"
    }
  }
]`;


test('summarizes simple error from message', () => {
  const errorsData = JSON.parse(errorFromMessage);
  expect(errors2string(errorsData)).toBe('ERROR: Cannot update record c352fe11-51e2-4e8b-87d6-578d6dedec8b because it has been changed (optimistic locking): Stored _version is 4, _version of request is 1 (23F09)');
});

test('summarizes simple error from label', () => {
  const errorsData = JSON.parse(errorFromLabel);
  expect(errors2string(errorsData)).toBe('Error encountered during upsert of Inventory record set');
});
