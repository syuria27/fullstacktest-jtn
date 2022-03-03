## FullstactTest Application

Ini adalah aplikasi fullstack yang dibuat oleh Syukron Rizqi Ardhi untuk tujuan tes kemampuan untuk masuk kerja sebagai Fullstack Dev atau Backend Dev di JTN/JTI

Project ini untuk pengoprasiaanya jalan di atas docker container dimana terdapat 3 docker container yaitu :

- PostgreSQL database
- Java backend (Spring Boot)
- Angular frontend (Nginx)

The entry point for a user is a website which is available under the
address: **http://localhost/**


---

### Prerequisites

In order to run this application you need to install two tools: **Docker** & **Docker Compose**.

Instructions how to install **Docker** on [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/), [Windows](https://docs.docker.com/docker-for-windows/install/) , [Mac](https://docs.docker.com/docker-for-mac/install/) .

**Dosker Compose** is already included in installation packs for *Windows* and *Mac*, so only Ubuntu users needs to follow [this instructions](https://docs.docker.com/compose/install/) .




### How to run it?

An entire application can be ran with a single command in a terminal:

```
$ docker-compose up -d
```

If you want to stop it use following command:

```
$ docker-compose down
```


---

#### test-postgres (Database)

PostgreSQL database contains only single schema with one table contact .

After running the app it can be accessible using this connectors:


- Host: *localhost*
- Database: *testdb*
- User: *postgres*
- Password: *password*


Like other parts of application Postgres database is containerized and
the definition of its Docker container can be found in
*docker-compose.yml* file.

```yml
test-postgres:
    image: "postgres:14.6-alpine"
    container_name: test-postgres
    #volumes:
      #- scrum-data:/var/lib/postgresql/data
    ports:
      - 5432:5432
    environment:
      - POSTGRES_DB:testdb
      - POSTGRES_USER:postgres
      - POSTGRES_PASSWORD:password
```

#### test-api (REST API)

This is a Spring Boot (Java) based application that connects with a
database that and expose the REST endpoints that can be consumed by
frontend. It supports multiple HTTP REST methods like GET, POST, PUT and
DELETE for maninpulating data contact.




This app is also put in Docker container and its definition can be found
in a file *api/Dockerfile*. 



#### test-web (Frontend)

This is a real endpoint for a user where they can manipulate data contact. It consumes the REST API endpoints provided by
*test-api*.

It can be entered using link: **http://localhost/**
