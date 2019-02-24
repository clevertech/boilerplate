## Useful commands

* `docker-compose ps`: To see what is currently running.
* `docker inspect $CONTAINER_NAME`: provide details on the container configuration, including the mounted volumes (See `Mounts` section)
* `docker exec -it $CONTAINER_NAME bash`: get a shell on the container
* `docker rm $(docker ps -a -q)`: Remove all containers
* `docker rmi $(docker images -q)`: Remove all images

## Safe cleanup -- remove unused containers, images and volumes

* `docker rm -v $(docker ps -a -q -f status=exited)`: Remove exited Docker containers
* `docker rmi $(docker images -f "dangling=true" -q)`: Remove all dangling images
* `docker volume rm $(docker volume ls -qf dangling=true)`: Remove all dangling volumes

## Troubleshooting

This section covers common issues that developers may encounter when executing this project.

**Bad response from Docker engine**

If when trying to execute `docker/run` you get `ERROR: Bad response from Docker engine`

Resetting to factory defaults in the docker menu (settings) fixed the issue.

**No such file or directory**

`ERROR: Service 'app' failed to build: lstat .cache.tgz: no such file or directory`

Don't try to run the command `docker-compose up`, instead always run: `docker/run` from the project root directory.
