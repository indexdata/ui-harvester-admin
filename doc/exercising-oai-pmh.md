# Exercising the OAI-PMH tools

In order to resolve [UIHAADM-2](https://issues.folio.org/browse/UIHAADM-2) (Detect set names and metadata prefixes from OAI-PMH services), we are planning to use [the `oai-pmh` library](https://github.com/paperhive/oai-pmh). This seems to be fairly simple, minimal code, as we would hope, but is not quite a fully documented as we might wish.

Here is how to install it for local use:
```
mkdir /tmp/x
cd /tmp/x
yarn add oai-pmh
```

Next, choose a repository to query: if you don't have one, there is a list at https://www.openarchives.org/Register/BrowseSites. For brevity, we assign it to an exported variable.

```
export OAI_URL=https://ora.ox.ac.uk/oai2
```

Here is how to exercise the OAI-PMH library via its command-line interface, using [all six OAI-PMH verbs](https://www.openarchives.org/OAI/openarchivesprotocol.html#ProtocolMessages):
* Identify (get information about the service)
* ListSets (fetch names of sets of records)
* ListMetadataFormats (determine which formats records can be retrieved in)
* ListIdentifiers (fetch brief records; metadata prefix must be specified)
* ListRecords (fetch full records; metadata prefix must be specified)
* GetRecord (fetch a single full record by ID)

(We use `./node_modules/bin/oai-pmh` rather than `yarn oai-pmh` because the latter emits boilerplate on startup and ending which prevents `jq` from parsing the JSON that is the actual output.)

```
./node_modules/.bin/oai-pmh identify $OAI_URL | jq
./node_modules/.bin/oai-pmh list-sets $OAI_URL | jq
./node_modules/.bin/oai-pmh list-metadata-formats $OAI_URL | jq
```

Now choose one of the metadata prefixes returned in the last response, for example `base_dc`, and use it as the argument to the `-p` option in `list-identifiers` or `list-records`. (We don't feed the results though `jq` in these cases, as they can be very long and it's better to see the responses as they stream back.)
```
./node_modules/.bin/oai-pmh list-identifiers $OAI_URL -p base_dc
# or
./node_modules/.bin/oai-pmh list-records $OAI_URL -p base_dc
```

Finally, choose an identifier from the `list-identifiers` result, for example `oai:ora.ox.ac.uk:uuid:0080989d-b09c-47f6-95a5-e04f4530a915`, and use it to fetch the full record:
```
./node_modules/.bin/oai-pmh get-record $OAI_URL -p base_dc -i oai:ora.ox.ac.uk:uuid:0080989d-b09c-47f6-95a5-e04f4530a915 | jq
```

