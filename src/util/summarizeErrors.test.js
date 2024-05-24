import { errors2string } from './summarizeErrors';

const errorsString = `[
  {
    "error": {
      "label": "Error encountered during upsert of Inventory record set",
      "entity": {
        "id": "c352fe11-51e2-4e8b-87d6-578d6dedec8b",
        "hrid": "1877906867",
        "notes": [
          {
            "note": "Dissertation, Universität Bremen, 2023",
            "instanceNoteTypeId": "b73cc9c2-c9fa-49aa-964f-5ae1aa754ecd"
          }
        ],
        "title": "Antje test alter titel mit 3 Exemplaren. 19F-MR basierte Temperaturbestimmung in biokompatiblen Lösungen unter Einsatz neuer fluorierter Ligandensysteme und ausgewählter Übergangsmetallkomplexe / Felix Mysegaes",
        "series": [
          {
            "value": "Medizinische Chemie"
          }
        ],
        "source": "K10plus",
        "_version": 1,
        "editions": [
          "1. Auflage"
        ],
        "languages": [
          "ger"
        ],
        "indexTitle": "Antje test alter titel mit 3 Exemplaren 19FMR basierte Temperaturbestimmung in biokompatiblen Lösungen unter Einsatz neuer fluorierter Ligandensysteme und ausgewählter Übergangsmetallkomplexe Felix Mysegaes",
        "identifiers": [
          {
            "value": "1877906867",
            "identifierTypeId": "1d5cb40c-508f-451b-8952-87c92be4255a"
          },
          {
            "value": "9783843954136",
            "identifierTypeId": "8261054f-be78-422d-bd51-4ed9f33c3422"
          },
          {
            "value": "KXP: 1877906867",
            "identifierTypeId": "8e33c1be-e2c4-43ac-a975-8fb50f71137a"
          }
        ],
        "publication": [
          {
            "role": "Publisher",
            "place": "München",
            "publisher": "Verlag Dr. Hut",
            "dateOfPublication": "2024"
          }
        ],
        "contributors": [
          {
            "name": "Mysegaes, Felix",
            "primary": "true",
            "contributorTypeId": "6e09d47d-95e2-4d8a-831b-f777b8ef6d81",
            "contributorTypeText": "VerfasserIn",
            "contributorNameTypeId": "2b94c631-fca9-4892-a730-03ee529ffe2a"
          },
          {
            "name": "Montforts, F.-P.",
            "contributorTypeId": "825a7d9f-7596-4007-9684-9bee72625cfc",
            "contributorTypeText": "AkademischeR BetreuerIn",
            "contributorNameTypeId": "2b94c631-fca9-4892-a730-03ee529ffe2a"
          },
          {
            "name": "Plaumann, M.",
            "contributorTypeId": "825a7d9f-7596-4007-9684-9bee72625cfc",
            "contributorTypeText": "AkademischeR BetreuerIn",
            "contributorNameTypeId": "2b94c631-fca9-4892-a730-03ee529ffe2a"
          }
        ],
        "instanceTypeId": "6312d172-f0cf-40f6-b27d-9fa8feaf332f",
        "electronicAccess": [],
        "modeOfIssuanceId": "9d18a02f-5897-4c31-9106-c9abb5c7ae8b",
        "alternativeTitles": [],
        "instanceFormatIds": [
          "8d511d33-5e85-4c5d-9bce-6e3c9cd0c324"
        ],
        "administrativeNotes": [
          "Aau (0500: Bibliografische Gattung)",
          "14.01.24, 19:02 (0210: Datum der letzten Änderung)"
        ],
        "natureOfContentTermIds": [
          "94f6d06a-61e0-47c1-bbcb-6186989e6040"
        ]
      },
      "message": "ERROR: Cannot update record c352fe11-51e2-4e8b-87d6-578d6dedec8b because it has been changed (optimistic locking): Stored _version is 4, _version of request is 1 (23F09)",
      "transaction": "",
      "typeOfError": "Multi-Status",
      "typeOfRecord": "INSTANCE"
    }
  }
]`;

const errorsData = JSON.parse(errorsString);

test('summarizes simple error', () => {
  expect(errors2string(errorsData)).toBe('Error encountered during upsert of Inventory record set');
});
