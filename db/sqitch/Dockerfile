FROM debian:stretch

ARG HOST_USER_UID=1000
ARG HOST_USER_GID=1000

RUN set -ex                                                 && \
                                                               \
    echo 'Creating notroot user and group from host'        && \
    groupadd -g $HOST_USER_GID notroot                      && \
    useradd -lm -u $HOST_USER_UID -g $HOST_USER_GID notroot



RUN apt update \
  && apt install -y postgresql-client-9.6 sqitch

ENV DBNAME=rpg

ADD . /src
VOLUME /src
WORKDIR /src

RUN set -ex                                                 && \
                                                               \
    echo 'Giving permissions to files'                      && \
    chown -R notroot:notroot /src                           

USER notroot

ENTRYPOINT ["./sedscript.sh"]
