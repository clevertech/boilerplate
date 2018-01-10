## Docker Configuration

This project is based on Docker/Docker-Compose for local development and Kubernetes for remote deployment. 

### Entry points

Scripts `docker/run` and `docker/test` are meant to be called directly during local development from the root directory.

### Directory `definitions`

Contains Dockerfiles and accessory file for Docker images that are not built by us at CT

* `redis` is used during local development. Databases for server environments are usually not on Docker.
