CREATE KEYSPACE api_managment WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': '1'} AND DURABLE_WRITES = true;

CREATE TABLE api_managment.response (
	id uuid,
	user_id bigint,
	app_id bigint,
	request_ip varchar,
	route varchar,
	size int,
	key_slug varchar,
	created timestamp,
	modified timestamp,
	PRIMARY KEY(id, user_id, app_id, request_ip, route, size, key_slug)
) WITH comment = "Table for register response objects form all the App Builders apis.";


INSERT INTO api_managment.response (id, user_id, app_id, request_ip, route, size, key_slug, created, modified)
values (now(), 1, 1, '192.168.1.10', '/status', 304, 'web', toTimestamp(now()), toTimestamp(now()));