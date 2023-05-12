# Notes on searching old jobs

The code is in [`OldJobsSearchPane.js`](../src/search/OldJobsSearchPane.js).

Niels-Erik says that id, harvestableId, name, type and status are queryable via the WSAPI.

The relevant part of
[UI Harvester Admin. Spec of UI screen for logs](https://docs.google.com/document/d/1b2lcFJigAaVtNHHRAeg9eKG_YZKtEITxGr-bzmiXJUc/edit#heading=h.2vew9v37t5rc)
says:

## Search and filter:
* Filter on
  * Status -> implemented in API
  * Started running (from/until) (Date range) -> implemented in API
  * Ended running (from/until)  (Date range) -> not yet implemented in API (NE: small detail to implement a query parameter)
* Search: Keyword search over complete log message -> not yet implemented in API (NE: small detail to implement a query parameter)
* Implement search options for:
  * EPN
  * PPN
  * Title
  * All
  * Query search (CQL)

