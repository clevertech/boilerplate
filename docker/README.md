## Docker Configuration

This project is based on Docker/Docker-Compose for local development and Kubernetes for remote deployment.

### Entry points

Scripts `docker/run` and `docker/test` are meant to be called directly during local development from the root directory.

### Directory `definitions`

Contains Dockerfiles and accessory file for Docker images that are not built by us at CT

- `redis` is used during local development. Databases for server environments are usually not on Docker.

## Run entry points without Docker

One can run `api` and `frontend` endpoints without Docker.
If internal environment of those containers does not differ from the host one it will significantly improve
the response time of the application and the hot module reloading system.
Never try to use this technique on production.

First you have to correct the docker-compose.yml, exposing the port for Redis:

```yaml
redis:
  build: docker/definitions/redis
  ports:
    - 6379:6379
```

Consult DevOps for the details of the production deploy whether it will introduce the security breach.

Then, you need to start only the auxiliary containers:

```bash
$ docker-compose up db redis adminer
```

Wait until they start.

After that go to `api` directory and run the startup script, overwriting the environment variables declared in `.env` which contain hostnames of redis and db machines:

```shell
$ DB_HOST=127.0.0.1 REDIS_HOST=127.0.0.1 yarn start-dev
```

It will hijack your current console with the output of `api` application, _running on your host machine now_.

In the separate console, go to `frontend` directory and just run the `frontend` application without other complications:

```shell
$ yarn start
```

This will start the development server, the same way as `frontend` container did, but on your host machine.
