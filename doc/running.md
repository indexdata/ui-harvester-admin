# Running `ui-harvester-admin` against a local backend

Check out, build and run `mod-harvester-admin` against an existing legacy harvester, such as the PALCI harvester:
```
$ git clone git@github.com:indexdata/mod-harvester-admin
$ cd mod-harvester-admin
$ mvn install
$ csh
% setenv harvester.host palci-harvester.reshare.indexdata.com
% java -jar target/mod-harvester-admin-fat.jar
```
Leave this running.

Download a FOLIO back-end vagrant box, configure it to have enough memory, and run it:
```
$ sudo apt-get install vagrant virtualbox
$ mkdir vagrant
$ cd vagrant
$ vagrant init --minimal folio/testing-backend
$ vi Vagrantfile # add this stanza:
	config.vm.provider "virtualbox" do |vb|
	  vb.memory = 16384
	  vb.cpus = 2
	end
$ vagrant up
```

Set up an SSH tunnel so the vagrant box can see the locally running module:
```
$ vagrant ssh -- -R 12369:localhost:8080
guest$ # Leave the ssh session open
```

Tell Okapi about the locally running module. In another shell: POST the module descriptor, POST a discovery descriptor that tells Okapi where to find the already-running module, and enable the module for a tenant:
```
$ cd mod-harvester-admin
$ curl -w '\n' -d @target/ModuleDescriptor.json http://localhost:9130/_/proxy/modules
$ curl -w '\n' -d @target/DiscoveryDescriptor-template.json http://localhost:9130/_/discovery/modules
$ curl -w '\n' -d @target/TenantModuleDescriptor-template.json http://localhost:9130/_/proxy/tenants/diku/modules
```

Now you can run Stripes against the VM's Okapi on http://localhost:9130 and the side-loaded harvester-admin module will be available, as you can verify by going to the **Software versions** at (for example) http://localhost:3003/settings/about and searching within the page for `mod-harvester-admin`.

