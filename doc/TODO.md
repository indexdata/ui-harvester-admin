# TODO - Very lightweight local issues database

I compared the current ui-harvester-admin UI with that of the legacy UI to derive the TODOs in the first few sections. [GBV made comments](https://drive.google.com/file/d/1_PYsNa20k0vmAD09GD2iAuO7D3aaBLHV/view) on the screenshots that I supplied on 15 March, and recorded [a video of the accompanying presentation](https://drive.google.com/file/d/1V7s0ApLVZe-AxQoEy5WTjDaf3YElZlWW/view). Based on these, the TODOs in the last section emerged.

Statuses:
* **TODO** -- it's on me
* **done** -- recently completed, left around for the sense of achievement (will be deleted)
* **no** -- not to be done in the short term
* **BLOCKED** -- cannot be implemented against the present `mod-harvester-admin`
* **@name** -- I need information or work from the named person before I can proceed
* _(none)_ -- completed

## General section

* **done** -- Dates should be managed using a date-picker. (The old harvester-admin UI doesn't do this, but of course we want to surpass it in this and other aspects.)
* **done** -- Id: should be read-only
* **done** -- Content Description: should be text-area
* **done** -- Technical Notes: should be text-area
* **done** -- Contact notes: should be text-area
* **no** -- Harvest schedule: should provide a schedule editor [6]
* **done** -- Transformation Pipeline: should provide a dropdown
* **done** -- Storage: should provide a dropdown
* **done** -- Log level: should provide a dropdown [1]
* **done** -- Saving failed records: should provide a dropdown [3]
* **done** -- Send notification if severity at least: should provide a dropdown [2]


## OAI-PMH section

* **TODO** -- OAI Set Name (type for suggestions): should do _something_ clever [5]
* **TODO** -- Metadata Prefix: should provide a dropdown [5]
* **done** -- Use long date format: should somehow be a checkbox


## XML Bulk section

* **done** -- URLs (space-separated): should be an editable list
* **done** -- MARC XML transformation format (application/marc or application/tmarc): should be a dropdown offering MARCXML, TurboMARC or N/A.


## Connector section

* **BLOCKED** -- CF Engine: should be a dropdown [4]
* **BLOCKED** -- CF Repository: should be a dropdown [4]
* **done** -- Init Data: should be a text-area

## Status section

* **done** -- Id: should be read-only
* **no** -- Harvest schedule: should provide a schedule editor [6]

## Arising from screenshot analysis

* **@charlotte** -- We need to get GBV a system that they can play with soonest.
* **@nielserik** -- I need guidance on how to format the long status text. Is the `message` field is formatted reliably enough that I can parse out the numbers and present them differently? Or is the best we can really do just to dump the message out blindly?
* **BLOCKED** -- provide log links in the UK: we need new mod-harvester-admin WSAPI to provide access to the logs.
* **TODO** -- the set of fields to show/hide is _not_ persisted across sessions. That seems like a bug to me. I am pushing towards fixing this at the stripes-components level, starting with [STCOR-601, "Add facility for persistent storage of user preferences"](https://issues.folio.org/browse/STCOR-601).
* **@gbv** -- The "General" section contains the fields that are relevant for all the different kinds of harvestable. If in fact some of them are _not_ relevant for XML harvests, then perhaps they are misplaced. Which fields fall into that category?
* **@gbv** -- I can break the "General" section down into smaller sections, but I need your guidance on what the new groupings should be.
* **done** -- cluster some fields together as multiple columns of a single row:
  * id + name + service provider
  * used by + managed by
  * technical notes + contact notes
  * harvest job enabled + harvest scheduled
  * user name + password
  * (in OAI-PMH section): harvest from + harvest until
  * (in OAI-PMH section) request retry count + delay before retry (seconds)
  * cache on disk? + store original record content?
  * maximum number of failed records saved next run + maximum number of failed records saved next total
* **@gbv** -- I would like much more detail on which fields should be grouped onto multi-column lines.
* **done** -- Notification e-mail addresses should be an editable list
* **done** -- Constant fields should be an editable list
* **done** -- Filter, comma-separated list of usage tags should be an editable list
* **done** -- Filter, comma-separated list of admin tags should be an editable list
* **done** -- Custom e-mails addresses should be an editable list
* **done** -- full-record Actions menu needs option to delete the harvestable
* **done** -- Record-list Actions menu needs options to add harvestables of each kind
* **done** -- full-record Actions menu needs option to start the job
* **BLOCKED** -- full-record Actions menu needs option to stop the job. The code is in place for this, but there seems to be nothing on the back-end yet.
* **TODO** -- all editable fields should have a help-text like that of the legacy UI. Texts can be found in `localindices/harvester-admin/src/main/resources/contexthelp.properties`


# Notes

[1] Log level is a hardwired vocabulary:  "TRACE", "DEBUG", "INFO", "WARN", "ERROR".

[2] Send notification is a hardwired vocabulary: "OK", "WARN", "ERROR"

[3] This is another hardwired vocabulary consisting of:
* `NO_STORE` (Don't save failed records)
* `CLEAN_DIRECTORY` (Do save. Clean up directory first)
* `CREATE_OVERWRITE` (Do save. Overwrite existing files)
* `ADD_ALL` (Do save. Add numbered versions for existing files)

[4] These cannot currently be implemented, as the legacy UI asks the legacy WSAPI for the relevant values but those WSAPI calls are not yet wired out through `mod-harvester-admin`. See [MODHA-5](https://issues.folio.org/browse/MODHA-5).

[5] "OAI Set Name" , "Metadata Prefix":   When an OAI URL is entered, the legacy admin UI then goes to that service and asks fo available set names and available metadata prefixes to populate the drop-downs. The FOLIO UI module should do the same. We have [a tool that shows the look-ups](https://oai-pmh-viewer.reshare-dev.indexdata.com/) (login as `oaitester`/`oai1325`). It can be used with OAI-PMH services such as https://na01.alma.exlibrisgroup.com/view/oai/01SSHELCO_MILLRSVL/request. `ListSets.set[n].setSpec` in the OAI-PMH service's XML response is what we copy into our "OAI Set Name" field.

[6] in general, the schedule fields should be presented (for both view and edit) in a human-readable form, not as its underlying crontab string. But since BGV do not really use scheduling, relying on manual starting of jobs, this is not urgent and can pushed off to a later phase of work. For now, it suffices to provide a good help text for the cron format. When we do this, what is the best way to edit the crontab entry stored in the record? Ideally we would like to find a Node package that provides a crontab-entry editor rather than rolling our own. The only direct contender is
[`react-js-cron`](https://github.com/xrutayisire/react-js-cron).
That has a very nice UI, but depends on a big (165 Mb) library `antd` which may not play well with stripes-componwents. So we may be better off rolling our own using the lower-level parse/render utilities provided by
[`cron-converter`](https://github.com/roccivic/cron-converter).

