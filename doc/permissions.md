# Re-establishing permissions after changing the module descriptor

In principle, it's straightforward to re-establish permissions for your module after having changed them in the package file:
* Load the change module descriptor into Okapi, so that it generates the new and changed permissions
* Enable the module for your tenant (XXX which I am pretty sure is not necessary in fact)
* Log into the tenant as a sufficiently privileged user
* Add all the module's permissions to the user of your choice

In practice, several infelicities make the details awkward:
* A bug in the current `stripes-cli` means that the `--okapi` argument is never saved, and must be explicitly given with each command.
* Likewise, the tenant is never saved, and must be repeated for all tenant-specific commands
* Yarn emits its own command-line noise that pollutes the list of permissions emitted by `stripes app perms`, so it cannot be used to run `stripes` in that step.

Putting it all together, here is the necessary sequence of commands

```
yarn stripes mod add --okapi http://localhost:9130
yarn stripes mod enable --tenant diku --okapi http://localhost:9130
yarn stripes okapi login diku_admin --tenant diku --okapi http://localhost:9130
# ... enter password when prompted ...
./node_modules/.bin/stripes app perms |
	yarn stripes perm assign --user someguy --tenant diku --okapi http://localhost:9130
```

