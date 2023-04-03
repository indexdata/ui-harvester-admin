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
* Provide access to older harvester logs across all jobs. Fixes UIHAADM-30.
* Create a search pane for the old-logs page. Fixes UIHAADM-31.
* Activate the search pane for the harvestable-specific old-logs page. Fixes UIHAADM-34.

## [0.1.0](https://github.com/folio-org/ui-harvester-admin/tree/v0.1.0) (2022-07-19)

* New app, first release.

