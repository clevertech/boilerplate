FROM node:10.15-alpine
MAINTAINER Clevertech DevOps <support@clevertech.biz>

# Update OS
RUN apk update && apk upgrade && apk --no-cache add ca-certificates && update-ca-certificates

# Create the working dir
RUN mkdir -p /opt/app && mkdir /opt/cache
WORKDIR /opt/app

COPY --chown=node:node . /opt/app
COPY --chown=node:node internal_node_modules /opt/app/node_modules
RUN chown node:node /opt/app

USER node

RUN cd /opt/app && yarn && yarn build

EXPOSE 3000
CMD ["node", "server/index.js"]
