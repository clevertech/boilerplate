## MacOS

> If you have installed Docker via `brew`, uninstall it via `brew uninstall docker`. Optionally, see the [Migrate from Boot2Docker](https://docs.docker.com/v1.8/installation/mac/) section.

1. Install the new [Docker for MAC](http://www.docker.com/products/docker#/mac).
2. Edit your `/etc/hosts` file. Add the line `127.0.0.1 local.cleverbuild.biz`.

3. To test if your configuration is correct, run `docker ps`. You should see something like:

   ```
   $ docker ps
   CONTAINER ID        IMAGE
   ```

4. You can adjust Docker resource usage clicking on the Docker icon -> Preferences -> Advanced.

If you have troubles, please contact DevOps.

## Linux

1. [Install](https://docs.docker.com/engine/installation/) Docker. You don't need `Docker Machine` on Linux.
2. [Allow](https://docs.docker.com/v1.4/installation/ubuntulinux/#giving-non-root-access) your non-root user to control `docker`.
3. [Install](https://docs.docker.com/compose/install/) Docker Compose.
4. Edit your `/etc/hosts` file. Add the line `127.0.0.1 local.cleverbuild.biz`.

To test if your configuration is correct, run `docker ps`. You should see something like:

```bash
$ docker ps
CONTAINER ID        IMAGE
```

If you have troubles, please contact DevOps.

## Windows

While it's suboptimal, as tested in October 2018 it's possible to run this Docker stack in Windows.

Tested in Windows 10.

You will need a couple of workarounds for that:

1. Usually you have Git for Windows installed already.
   It contains Git Bash shell which comes with complete POSIX-compatible environment via MSYS.
   It will allow you to run `docker/run` script natively, but you must run it with a special environment variable set,
   which will be explained later.
2. Hot reloading of the files will not work because Docker for Windows uses different tech for signaling the container
   and the container by default does not gets notified after changes in the mounted files or directories.
   People [discussed it in the forums](https://forums.docker.com/t/file-system-watch-does-not-work-with-mounted-volumes/12038/8)
   and there's [a separate Python script solution for that](https://github.com/merofeev/docker-windows-volume-watcher).
3. For Docker for Windows to be able to mount folders for alephbeta docker container stack you need to explicitly enable "disk sharing"
   for the disk on which the project files are stored.
   And to do that you need to have a password defined for your Windows user.
   If you want to retain paswordless login to your workstation after that, you have to google the solution yourself.

So, the whole procedure looks like this:

1. Install Git for Windows.
2. Install Docker for Windows.
3. Install Python for Windows.
4. Clone the repository, enable sharing of the disk containing the repository in Docker parameters. Install NPM dependencies if needed.
5. Open the project folder using Git Bash, then run the startup script like that:

   ```bash
   MSYS_NO_PATHCONV=1 docker/run
   ```

   This will tell Git Bash to correctly process absolute paths inside the `docker/run` Bash script.
   On Windows you **must** run `docker/run` with `MSYS_NO_PATHCONV=1` inside MSYS2 environment or it will simply not work, as it's a bash script.

6. To have hot module reloading properly working, you need to enable file watchers using docker-windows-volume-watcher Python package, like this:

   ```bash
   pip install docker-windows-volume-watcher
   docker-volume-watcher
   ```

   Script can be started from any folder, it watches all currently running containers by default. Hot reloading will work _only_ while this script is running.

7. Add `local.cleverbuild.biz 127.0.0.1` to your HOSTS file.

It's possible to install everything inside the virtual machine, either in VirtualBox or in native Hyper-V hypervisor,
but VirtualBox incurs enormous penalty on performance, and Hyper-V image coredumps randomly.
Your mileage may vary, though.
