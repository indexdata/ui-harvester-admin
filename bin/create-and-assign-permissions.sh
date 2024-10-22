. $HOME/git/folio/other/okclient/ok.sh

OK -u harvester_admin -t harvester -h https://snapshot-dev-okapi.folio-dev.indexdata.com

userId="$(OK users -q 'username==harvester_admin' -j 'RECORDS[].id')"
userPermsId="$(OK perms/users -q userId="$userId" -j 'RECORDS[].id')"

OK perms/permissions -d '{"permissionName": "mod-settings.global.read.mod-harvester-admin"}'
OK perms/permissions -d '{"permissionName": "mod-settings.global.write.mod-harvester-admin"}'

OK perms/users/"$userPermsId"/permissions -d '{"permissionName": "mod-settings.global.read.mod-harvester-admin"}'
OK perms/users/"$userPermsId"/permissions -d '{"permissionName": "mod-settings.global.write.mod-harvester-admin"}'
OK perms/users/"$userPermsId"/permissions -d '{"permissionName": "mod-settings.entries.item.post"}'
OK perms/users/"$userPermsId"/permissions -d '{"permissionName": "mod-settings.entries.collection.get" }'
OK perms/users/"$userPermsId"/permissions -d '{"permissionName": "mod-settings.entries.item.put" }'

OK -x
