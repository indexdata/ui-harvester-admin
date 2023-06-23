# Re-establishing permissions after changing the module descriptor

In principle, it's straightforward to re-establish permissions for your module after having changed them in the package file:
* Load the changed module descriptor into Okapi, giving it a unique version number
* Disable the old version of the module for your tenant
* Enable the module for your tenant, so that Okapi generates the new and changed permissions
* Log into the tenant as a sufficiently privileged user
* Add all the module's permissions to the user of your choice

In practice, several infelicities make the details awkward:
* A bug in the current `stripes-cli` means that the `--okapi` argument is never saved, and must be explicitly given with each command.
* Likewise, the tenant is never saved, and must be repeated for all tenant-specific commands
* Yarn emits its own command-line noise that pollutes the list of permissions emitted by `stripes app perms`, so it cannot be used to run `stripes` in that step.

Putting it all together, here is the necessary sequence of commands

```
export OKAPI=http://localhost:9130 TENANT=diku
yarn stripes okapi login okapi_admin --okapi $OKAPI --tenant supertenant
# ... enter Okapi-admin password when prompted ...
yarn stripes mod disable --okapi $OKAPI --tenant $TENANT
# Update module version number in package.json
yarn stripes mod add --okapi $OKAPI
yarn stripes mod enable --okapi $OKAPI --tenant $TENANT
yarn stripes okapi login ${TENANT}_admin --okapi $OKAPI --tenant $TENANT
# ... enter password when prompted ...
./node_modules/.bin/stripes app perms |
	yarn stripes perm assign --user someguy --okapi $OKAPI --tenant $TENANT
```

XXX But this doesn't work because stripes-cli doesn't bother sending the Okapi token for for the various `mod` commands. So you have to run these commands using `env DEBUG=stripes-cli:okapi`, then copy-paste the emitted curl commands and manually add the necessary `-H 'X-Okapi-Token: 12345'` argument.

