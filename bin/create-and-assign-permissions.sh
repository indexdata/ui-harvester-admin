userId="$(OK users -q 'username==diku_admin' -j 'RECORDS[].id')"
userPermsId="$(OK perms/users -q userId="$userId" -j 'RECORDS[].id')"

OK perms/permissions -d '{"permissionName": "mod-settings.global.read.mod-harvester-admin"}'
OK perms/permissions -d '{"permissionName": "mod-settings.global.write.mod-harvester-admin"}'

OK perms/users/"$userPermsId"/permissions -d '{"permissionName": "mod-settings.global.read.mod-harvester-admin"}'
OK perms/users/"$userPermsId"/permissions -d '{"permissionName": "mod-settings.global.write.mod-harvester-admin"}'

OK -x
