# Change history for ui-harvester-admin

## 1.0.0 (IN PROGRESS)

* First version to work with `harvester-admin` interface v1.x.
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
* Provide access to older harvester jobs across all harvestables. Fixes UIHAADM-30.
* Create a search pane for the old-jobs page. Fixes UIHAADM-31.
* Activate the search pane for the harvestable-specific old-jobs page. Fixes UIHAADM-34.
* Minor quality-of-life improvements for Logs page. Fixes UIHAADM-37.
* Single-line summary of stats from harvestable message. Fixes UIHAADM-38.
* Rename various entites (Harvest Jobs -> Harvestables, Old Logs -> Old Jobs). Involves UI text, translation tag names, component names, function names, source file names, HTML element IDs and data-text-XXX attributes. Fixes UIHAADM-33. Next time, names things right the first time.
* Searching jobs by ID or Harvestable ID now works correctly. Fixes UIHAADM-35.
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

## [0.1.0](https://github.com/folio-org/ui-harvester-admin/tree/v0.1.0) (2022-07-19)

* New app, first release.

