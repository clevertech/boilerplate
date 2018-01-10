## MacOS

> If you have installed Docker via `brew`, uninstall it via `brew uninstall docker`. Optionally, see the [Migrate from Boot2Docker](https://docs.docker.com/v1.8/installation/mac/) section.

1. Install the new [Docker for MAC](http://www.docker.com/products/docker#/mac).
2. Edit your `/etc/hosts` file. Add the line `127.0.0.1 local.cleverbuild.biz`.

To test if your configuration is correct, run `docker ps`. You should see something like:

```
$ docker ps
CONTAINER ID        IMAGE
```

3. You can adjust Docker resource usage clicking on the Docker icon -> Preferences -> Advanced.

If you have troubles, please contact DevOps.

## Linux

1. [Install](https://docs.docker.com/engine/installation/) Docker. You don't need `Docker Machine` on Linux.
2. [Allow](https://docs.docker.com/v1.4/installation/ubuntulinux/#giving-non-root-access) your non-root user to control `docker`.
3. [Install](https://docs.docker.com/compose/install/) Docker Compose.
4. Edit your `/etc/hosts` file. Add the line `127.0.0.1 local.cleverbuild.biz`.

To test if your configuration is correct, run `docker ps`. You should see something like:

```
$ docker ps
CONTAINER ID        IMAGE
```

If you have troubles, please contact DevOps.

## Windows

Windows is not supported. We strongly recommend to setup a development environment in a Linux virtual machine. You can use Vagrant or plain Virtualbox. Ask DevOps for help.
