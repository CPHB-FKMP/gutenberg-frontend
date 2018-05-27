# Gutenberg Frontend

## Requirements

* Http-server
* Browser
* Backend can be found (here)[https://github.com/CPHB-FKMP/gutenberg-backend]

## Http-server

1. Start the backend
2. Start the frontend using commad "http-server" in terminal we in the folder
3. Navigate localhost:8080 or the port its tells you in the terminal

## Production enviroment

### Neo4J
```
docker run -d --name neo4j-exam --publish=7474:7474 --publish=7687:7687 --env NEO4J_AUTH=neo4j/class --env=NEO4J_dbms_security_procedures_unrestricted=apoc.\*,algo.\* --env=NEO4J_dbms_memory_pagecache_size=6G --env=NEO4J_dbms_memory_heap_max__size=10G aaxa/gutenberg-neo4j

docker exec -it neo4j-exam /bin/bash

rm -rf /var/lib/neo4j/data/databases/graph.db/

docker exec neo4j-exam sh -c 'neo4j-admin import \
    --nodes:Author /import/neo-authors.csv --nodes:Book /import/neo-books.csv --nodes:City /import/neo-cities.csv \
    --relationships:WRITTEN_BY /import/neo-books-authors.csv --relationships:CONTAINS /import/neo-books-cities.csv \
    --ignore-missing-nodes=true \
    --ignore-duplicate-nodes=true \
--delimiter "|"'
```

### Postgres

Use these command in your terminal to set up production data for Postgres

```
docker run -p 5432:5432 --name psql -d aaxa/gutenberg-postgresql
   
docker exec -it psql-test /bin/bash
```
login to the PostgreSQL database as appdev user
```
psql -h localhost -U appdev
```
When you are logged in as a user then you can run the following commands

Copy and run this script in the terminal (Script-link)[https://github.com/CPHB-FKMP/gutenberg-backend/blob/master/src/main/resources/PostgreSQL.sql]

```
   \copy gutenberg.books FROM 'import/postgres-books.csv' WITH CSV HEADER DELIMITER AS '|';

   \copy gutenberg.cities FROM 'import/postgres-cities.csv' WITH CSV HEADER DELIMITER AS '|';

   \copy gutenberg.authors FROM 'import/postgres-authors.csv' WITH CSV HEADER DELIMITER AS '|';

   \copy gutenberg.authors_books FROM 'import/postgres-books-authors.csv' WITH CSV HEADER DELIMITER AS '|';

   \copy gutenberg.books_cities FROM 'import/postgres-books-cities.csv' WITH CSV HEADER DELIMITER AS '|';
```


## Test enviroment

### Neo4J
Use these command in your terminal to set up test data for Neo4J
```
docker run \
	-d --name neo4j-test \
    --publish=7475:7474 \
    --publish=7688:7687 \
    --volume=$(pwd)/plugins:/plugins \
    --env NEO4J_AUTH=neo4j/class \
    --env=NEO4J_dbms_security_procedures_unrestricted=apoc.\\\*,algo.\\\* \
    --env=NEO4J_dbms_memory_pagecache_size=6G \
    --env=NEO4J_dbms_memory_heap_max__size=10G \
   aaxa/gutenberg-neo4j:test

docker exec -it neo4j-test /bin/bash

rm -rf /var/lib/neo4j/data/databases/graph.db/

docker exec neo4j-test sh -c 'neo4j-admin import \
    --nodes:Author /import/neo-authors-test.csv --nodes:Book /import/neo-books-test.csv --nodes:City /i
