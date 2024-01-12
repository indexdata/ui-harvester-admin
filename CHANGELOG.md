# Change history for ui-harvester-admin

## [2.1.0] IN PROGRESS

* Sort jobs in descending order by start date. Fixes UIHAADM-94.
* Paginate list of jobs. Fixes UIHAADM-95.
* Improve DatePicker setup. Fixes UIHAADM-69.
* Display `<Datepicker>` in full view by using `usePortal`. Fixes UIHAADM-98.
* Full display of a job now includes start time in header instead of current time. Fixes UIHAADM-103.

## [2.0.0](https://github.com/folio-org/ui-harvester-admin/tree/v2.0.0) (2023-10-13)

* BREAKING: upgrade React to v18. Fixes UIHAADM-90.
* Update Node.js to v18 in GitHub Actions. Fixes UIHAADM-89.
* In the Failed Records view, the "Record number" column can no longer be hidden. Fixes UIHAADM-71.
* Basic validation for new and edited harvestables. In particular: name, transformation pipeline and storage engine must all be provided before the form can be submitted. Fixes UIHAADM-70.
* Add amountHarvested filtering for the Jobs pane. Fixes UIHAADM-65.
* Support management of storage engines. Fixes UIHAADM-7.
* Validate and save JSON configuration of Harvestables. Fixes UIHAADM-74.
* Set up permissions. Fixes UIHAADM-73.
* Switch to local fixed copy of `<EntryManager>`. Fixes UIHAADM-76.
* `<EntryManager>` displays no action menu when no actions are permitted. Fixes UIHAADM-79.
* `<EntryManager>` checks correct permission for editing (PUT not POST). Fixes UIHAADM-77.
* Add permission guards to hide inoperative parts of the UI. Fixes Fixes UIHAADM-75.
* Progressive loading for Log pages. Fixes UIHAADM-83.
* Stopping a running job now works correctly. Fixes UIHAADM-80.
* Starting an already-running job, or stopping one that's not running, is now reported politely. Fixes UIHAADM-84.
* Deleting a harvestable no longer causes a benign alertbox about attempting to re-fetch the deleted object. Fixes UIHAADM-81.
* Provide ability to download last log for local analysis. Fixes UIHAADM-82.
* Support management of transformation steps. Fixes UIHAADM-9.
* Fix duplicate-step operation (previously failed with "Provided object contains unexpected additional property: virtualName"). Fixes UIHAADM-86.
* Duplication of records includes fields from full record, not just summary. Fixes UIHAADM-88.
* Changes made when editing a record in settings now immediately appear in the right pane. Fixes UIHAADM-85.
* `summarizeLine` now correctly includes "failed" counts. Fixes UIHAADM-91.

## [1.0.3](https://github.com/folio-org/ui-harvester-admin/tree/v1.0.3) (2023-05-26)

* Error-summarising function tolerates more possible structures. Fixes UIHAADM-72.

## 1.0.2 (does not exist due to CI problems)

## [1.0.1](https://github.com/folio-org/ui-harvester-admin/tree/v1.0.1) (2023-05-04)

* Remove some invalid translations from `es_419.json` as they prevent the bundle from building.

## [1.0.0](https://github.com/folio-org/ui-harvester-admin/tree/v1.0.0) (2023-05-04)

* Bump required `harvester-admin` interface to v1.0. Fixes UIHAADM-21.
* Remove no-longer-needed resolution. Fixes UIHAADM-20.
* Tidy up Harvestable editing forms in accordance with GBV's requests. Fixes UIHAADM-11.
* Tidy up Harvestable read-only displays to match editing forms. Fixes UIHAADM-12.
* Fix up [`zh_CN.json`](translations/ui-harvester-admin/zh_CN.json) translations to properly escape XML appearing in the help-text translations. Fixes UIHAADM-23.
* Provide access to most recent harvester logs. Fixes UIHAADM-5.
* Display summary header on the Logs page. Fixes UIHAADM-24.
* Display simple list of errors on the Logs page. Fixes UIHAADM-25.
* Cope elegantly with absent logs on the Logs page. Fixes UIHAADM-26.
* Add "View log" buttons to each row in list of harvestables. Fixes UIHAADM-27.
* Add "records" column to harvestables summary. Fixes UIHAADM-28
* Provide access to harvester logs from older jobs. Fixes UIHAADM-29.
* Provide access to older harvester jobs across all harvestables. Fixes UIHAADM-30.
* Create a search pane for the old-jobs page. Fixes UIHAADM-31.
* Activate the search pane for the harvestable-specific old-jobs page. Fixes UIHAADM-34.
* Minor quality-of-life improvements for Logs page. Fixes UIHAADM-37.
* Single-line summary of stats from harvestable message. Fixes UIHAADM-38.
* Rename various entites (Harvest Jobs -> Harvestables, Old Logs -> Old Jobs). Involves UI text, translation tag names, component names, function names, source file names, HTML element IDs and data-text-XXX attributes. Fixes UIHAADM-33. Next time, name things right the first time.
* Searching jobs by ID or Harvestable ID now works correctly. Fixes UIHAADM-35.
* On old-jobs page, add filters for date-started and date-finished. Fixes UIHAADM-36.
* On the Logs page, move the plain-text log above the failed records. Fixes UIHAADM-40.
* Remove the “source” data from all displays. Fixes UIHAADM-42.
* View logs for a job that had an error no longer crashes the UI! Fixes UIHAADM-45.
* Trying to view logs for a new (never run) job no longer hangs. Fixes UIHAADM-44.
* View-logs page wording and presentation varies depending on whether job is running. Fixes UIHAADM-39.
* Add a button on the Logs page to refresh the plain-text log. Fixes UIHAADM-41.
* Start/Stop Job now work, thanks to correct Accept header. Fixes UIHAADM-46.
* Sanitize XML-bulk records before saving by removing invalid fields. Fixes UIHAADM-47.
* Move Storage engines/Transformation pipelines/Transformation steps into settings (although they are not yet functional). Fixes UIHAADM-43.
* Remove `currentStatus` from submitted records: this is both read-only (so ignored when correct) and controlled (so it causes problems when it is not). Fixes UIHAADM-49.
* Prevent UI from attempting to sort Old Jobs on `seconds` column. Fixes UIHAADM-51.
* Harvestables can now be correctly saved even when `usedBy` or `managedBy` is set, as these is now edited as lists. Fixes UIHAADM-48.
* Provide a full-record view for individual jobs. Fixes UIHAADM-32.
* Minor UI changes decided. Fixes UIHAADM-52:
  * When viewing the jobs associated with a harvestable, the Jobs tab (not the Harvestables tab) is highlighted.
  * In the filter panes for both harvestables and jobs, the Reset button is moved up above the filters.
  * The the sorted result lists for both harvestables and jobs, the currently sorted-by header is highlighted and the sort direction indicated.
* "View log" button text is now "Current" or "Last" depending on status; "Old jobs" button added to harvestables list. Fixes UIHAADM-54.
* Politer error reporting. Fixes UIHAADM-56.
* Search-pane interactions now work correctly (umbrella). Fixes UIHAADM-55.
* Do not append asterisks to query terms. Fixes UIHAADM-58.
* "Reset all" button now correctly causes query-index and filters to redisplay as unselected. Fixes UIHAADM-59.
* Query index selection is now consistent, and supports all-index searches consistently. Fixes UIHAADM-60.
* Aggregated view of failed records. Fixes UIHAADM-53.
* Failed-records page: default to today's reports. Fixes UIHAADM-57.
* Add "Old jobs" column header above buttons in Harvestables view. Fixes UIHAADM-61.
* Remove view-log page's first **Developer Information** accordion. Fixes UIHAADM-62.
* Correct display of manually filtered Harvestables list. Fixes UIHAADM-63.
* The *Reset all* button now also clears search terms that have been entered but not submitted. Fixes UIHAADM-64.

## [0.1.0](https://github.com/folio-org/ui-harvester-admin/tree/v0.1.0) (2022-07-19)

* New app, first release.

