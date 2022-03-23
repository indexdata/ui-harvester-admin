# Work to be done in Harevstable editing forms

In general, there are various dates that should be managed using a date-picker. The old harvester-admin UI doesn't do this, but of course we want to surpass it in this and other aspects. The following lists are the ways in which the present harvestable form is less functional than that of the legacy UI.

Statuses:
* **TODO** -- it's on me
* **NE** -- I need information from Niels-Erik
* **BLOCKED** -- cannot be implemented against the present `mod-harvester-admin`
* _(none)_ -- completed


## General section

* **TODO** -- Id: should be read-only
* **TODO** -- Content Description: should be text-area
* **TODO** -- Technical Notes: should be text-area
* **TODO** -- Contact notes: should be text-area
* **TODO** -- Harvest schedule: should provide a schedule editor
* **TODO** -- Transformation Pipeline: should provide a dropdown
* **TODO** -- Storage: should provide a dropdown
* **TODO** -- Log level: should provide a dropdown [1]
* **TODO** -- Saving failed records: should provide a dropdown [3]
* **TODO** -- Send notification if severity at least: should provide a dropdown [2]


## OAI-PMH section

* **TODO** -- OAI Set Name (type for suggestions): should do _something_ clever [5]
* **TODO** -- Metadata Prefix: should provide a dropdown [5]
* **TODO** -- Use long date format: should somehow be a checkbox


## XML Bulk section

* **TODO** -- URLs (space-separated): should be a text-area of 15 rows


## Connector section

* **BLOCKED** -- CF Engine: should be a dropdown [4]
* **BLOCKED** -- CF Repository: should be a dropdown [4]
* **TODO** -- Init Data: should be a text-area

## Status section

* **TODO** -- Id: should be read-only
* **TODO** -- Harvest schedule: should provide a schedule editor


# Notes

[1] Log level is a hardwired vocabulary:  "TRACE", "DEBUG", "INFO", "WARN", "ERROR".

[2] Send notification is a hardwired vocabulary: "OK", "WARN", "ERROR"

[3] This is another hardwired vocabulary consisting of:
* `NO_STORE` (Don't save failed records)
* `CLEAN_DIRECTORY` (Do save. Clean up directory first)
* `CREATE_OVERWRITE` (Do save. Overwrite existing files)
* `ADD_ALL` (Do save. Add numbered versions for existing files)

[4] These cannot currently be implemented, as the legacy UI asks the legacy WSAPI for the relevant values but those WSAPI calls are not yet wired out through `mod-harvester-admin`.

[5] "OAI Set Name" , "Metadata Prefix":   When an OAI URL is entered, the legacy admin UI then goes to that service and asks fo available set names and available metadata prefixes to populate the drop-downs. The FOLIO UI module should do the same. We have [a tool that shows the look-ups](https://oai-pmh-viewer.reshare-dev.indexdata.com/) (login as `oaitester`/`oai1325`). It can be used with OAI-PMH services such as https://na01.alma.exlibrisgroup.com/view/oai/01SSHELCO_MILLRSVL/request. `ListSets.set[n].setSpec` in the OAI-PMH service's XML response is what we copy into our "OAI Set Name" field.

