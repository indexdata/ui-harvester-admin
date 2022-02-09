# Notes on UI requirements

From **Niels Erik Nielsen**, 2022-02-09T12:30

There's only one expressed requirement for the new UI; that it utilizes authentication to separate harvest configurations by tenant (well, most likely by tenant, could be by users too). Support for this separation by tenant is prepared by access-control-list columns in the legacy Harvester database and in the admin wrapper API.

GBV did not ask for any other changes.

The reason GBV prioritize this particular change is, that it would enable them to offload the harvest administration to individual organizations without installing a separate Harvester for each and every participating organization.

In the beginning, what you can do with the UI is also to some extent constrained by what the existing back-end offers. The existing database has a given structure that the harvesting logic relies on and that structure is reflected in the provided APIs. A complete re-think of the admin UI might involve database and API changes.

However, longer term, everything about the harvester and the admin UI could be up for consideration. For example, one problem I see in the current database structure is that it makes no distinction between a harvest job configuration and a harvest job run. They both reside in the same table, which makes it hard to know whether certain columns/properties are configuration properties or job status properties; some seem to a little of both. But more importantly it prevents us from keeping any kind of job history; the status of the most recent job is stored on the configuration record, but since there's only one configuration record per job, history can only go one job back. In short, I think we want to separate job configuration from job status and we want to be able to store the status of multiple harvest runs per harvest configuration. The UI would obviously eventually reflect a change like that.

The motivation for making few changes first off is to deliver the primary feature that GBV requested, sooner. But there are certainly things about the UI that could be improved with a modern UI framework even based on the existing APIs. Growing out of the general Java Server Pages/Faces philosophy, the current UI is reflecting the underlying table structure pretty closely in ways that makes the user interface clunky. The logic for adding transformation steps to a pipeline is a good example of this, I could demonstrate it. The ergonomics of that part of the UI could certainly be improved, but I think that's lower priority for GBV, compared to getting their hands on the basic separation by tenants.

Another thing that could be improved, but I'm not sure it's trivial, is the XSLT editing UI.

