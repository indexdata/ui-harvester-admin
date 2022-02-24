# The harvester query language

<!-- md2toc -l 2 query-language.md -->
* [Introduction](#introduction)
* [Overview](#overview)
* [Nested entities](#nested-entities)
* [Searchable indexes](#searchable-indexes)
* [Sorting](#sorting)
* [Appendix: filtering](#appendix-filtering)


## Introduction

The UI module `ui-harvester-admin` performs searches using the `query` parameter that is supported by the various get-list endpoints such as `/harvester-admin/harvestables`.

The queries that it sends to `mod-harvester-admin` are passed straight through to the Legacy Harvester (LH), so the UI module is responsible for generating queries in the format supported by the LH. What is that format? It is not documented anywhere at the time of writing, but the following is believed to be correct based on [Slack conversation with Niels-Erik](https://indexdata.slack.com/archives/D0HP3HAHJ/p1645017140951969?thread_ts=1644945894.440099&cid=D0HP3HAHJ).


## Overview

All queries are of the form _indexName_=_value_ (or less frequently _indexName_!=_value_ for negation). There is no way to search for a value without specifying the index. There are no boolean operations (AND, OR, NOT) -- just single-term queries.

Query values are generally case insensitive and can be left- and right-truncated with asterisks.

Examples of searching for harvest jobs by status or by name:
* `currentStatus=OK`
* `currentStatus=ok`
* `currentStatus=ERROR`
* `currentStatus=err*`
* `currentStatus=RUNNING`
* `name=Temple to palci-si.reshare (prod)`
* `name=*(prod)*`

(Unlike the asterisks, the `(` and `)` around `prod` in the last example are literal.)

Boolean values are supported, as for example `enabled=false`.

Numeric values must not be quoted, otherwise they will be interpreted as strings as record will not be matched. For example, even though the `id` field is reported as a string in the JSON Harvestable record (see below) it is internally an integer, and must be given as one in queries: `id=302*` will work, but `id="302*"` will not.


## Nested entities

Some attributes in the brief Harvestable record actually live in nested entities. For example, in the underlying database a Harvestable has a link to a Storage entity which has a URL property. The storage URL is represented in the brief harvestable record as `storageUrl`:
```
{
  "currentStatus" : "NEW",
  "enabled" : "false",
  "id" : "315503",
  "jobClass" : "OaiPmhResource",
  "lastHarvestFinished" : "2021-02-23T05:28:45Z",
  "lastHarvestStarted" : "2021-02-23T05:43:35Z",
  "lastUpdated" : "2021-02-24T16:13:30Z",
  "name" : "Dickinson to palci-si.reshare (prod)",
  "nextHarvestSchedule" : "2022-06-10T10:10:00Z",
  "storageUrl" : "https://palci-si-okapi.reshare.indexdata.com/"
}
```
But to query for Harvestable records by Storage URL, a dot notation is needed to drill into the Storage entity for the `url` field:

* `storage.url=*palci-si-okapi*`


## Searchable indexes

Indexes are not limited to properties in the brief records. For example, harvestable briefs don't contain the name or ID of the transformation pipeline that the job applies, but harvestables can be searched for by transformation ID by using the dot notation to access the relevant nested entity:

* `transformation.id=302201`

In general, all index-names are either literal field-names from the JSON record or dot-notation accesses to fields of the nested entites. We know about the `storage` and `transformation` embedded entities: there may be others. I am assuming for now that the index-name used on the right hand side of the dot notation is a fieldname from the record-type used by the embedded entity: further bulletins as events warrant.


## Sorting

Unlike the CQL queries used by RMB-based modules, where `sortby` is part of the query syntax, `mod-harvester-admin` implements sorting by a separate parameter, `orderBy`. This is passed straight through to the LH's `sort` parameter. The value is simply the name of a field. (I need to determine experimentally whether it can be a field from a nested entity.) More information can be gleaned from [the relevant part of the source code](https://github.com/indexdata/localindices/blob/53092e014ae0d7b5c7bb5c155d5bd0629954affe/masterkey-dal/src/main/java/com/indexdata/masterkey/localindices/dao/bean/HarvestablesDAOJPA.java#L51).


## Appendix: filtering

There is a `filter` parameter, separate from `query` although what it does is conceptually similar.

The legacy UI filters harvestables for a value in all of the properties "name", "description", "technicalNotes", "contactNotes", "serviceProvider", "usedBy", "managedBy", "currentStatus". However, the harverster admin wrapper doesn't currently forward any `filter` parameter to the LH, so this potentially useful feature is presently unavailable to us.

