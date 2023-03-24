# Internal notes on implementing log-file display

To be deleted after
[UIHAADM-5](https://issues.folio.org/browse/UIHAADM-5)
is complete.


## Documentation

* [UI Harvester Admin. Spec of UI screen for logs](https://docs.google.com/document/d/1b2lcFJigAaVtNHHRAeg9eKG_YZKtEITxGr-bzmiXJUc/edit#)
* [`mod-harvester-admin`'s log WSAPI](https://github.com/indexdata/mod-harvester-admin#harvester-logs-and-log-history). Niels-Erik [notes](https://issues.folio.org/browse/UIHAADM-5#:~:text=added%20a%20comment%20%2D-,22/Feb/23%2011%3A50%20AM,-Yes%2C%20those%20are) that the `.../job/run`, `../job/stop`  and `../log/store` endpoints are not relevant for this ticket.
* [Concrete examples of relevant WSAPI calls](https://jira.indexdata.com/browse/DEVOPS-1644?focusedCommentId=2198871&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-2198871)


## UI elements

The document [Ongoing Feedback Document for the Harvester UI](https://docs.google.com/document/d/1_XFdtvCNYlO78CemF8Zs9DmYFvg3Jx6SACsTKe-oiOE/edit?pli=1) reminds us that:
* We want a column in the harvestables list with a **View log** button.
* The action menu for individual harvestables needs a **View log** button.


