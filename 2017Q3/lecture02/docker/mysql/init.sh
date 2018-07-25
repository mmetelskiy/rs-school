cat "`dirname $0`"/init-rs-db.sql | docker exec -i docker_db_1 mysql -u rs-admin --password=rs-admin-secret-password rs-db
