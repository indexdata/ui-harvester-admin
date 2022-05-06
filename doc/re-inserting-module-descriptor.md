# Re-inserting the `mod-harvester-admin` module descriptor

`mod-harvester-admin` is under active development, including changes to its module descriptor. Each time this happens, it needs to be re-inserted into Okapi, so it can correctly route the new or changed requests. But before the descriptor can be inserted, the old one needs to be removed. But before that can be done, it has to be dissociated from all the tenants that are using it. Which means that after the new descriptor is inserted, the tenants need to be re-inserted. (Happily, we almost always have only the one tenant, `diku`, to worry about.)

So the sequence is:
* Dissociate `diku` from the module
* Remove the old module descriptor
* Insert the new module descriptor
* Re-associate `diku` with the module

No changes are needed to deployment, since [running.md](we are not running the module under Okapi's control).

The sequence of commands, then (to be run from the `mod-harvester-admin/target` directory):
```
curl -w '\n' -X DELETE http://localhost:9130/_/proxy/tenants/diku/modules/mod-harvester-admin-0.1.0-SNAPSHOT
curl -w '\n' -X DELETE http://localhost:9130/_/proxy/modules/mod-harvester-admin-0.1.0-SNAPSHOT
curl -w '\n' -d @ModuleDescriptor.json http://localhost:9130/_/proxy/modules
curl -w '\n' -d @TenantModuleDescriptor.json http://localhost:9130/_/proxy/tenants/diku/modules
```
