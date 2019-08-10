FROM node:10.15-alpine
MAINTAINER Clevertech DevOps <support@clevertech.biz>

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Update OS
RUN apk update && apk upgrade && apk --no-cache add ca-certificates && update-ca-certificates

# Create the working dir
RUN mkdir -p /opt/app
COPY . /opt/app

WORKDIR /opt/app

# We don't need to build in most cases since docker-compose command does it for us
RUN set -ex; \
  if [ "$NODE_ENV" = "production" ]; then \
    yarn install --frozen-lockfile --production; \
    yarn cache clean; \
    yarn run build; \
  elif [ "$NODE_ENV" = "test" ]; then \
    yarn install --frozen-lockfile; \
    yarn cache clean; \
    yarn run build; \
  else \
    yarn install --frozen-lockfile; \
  fi; 

EXPOSE 3000

RUN set -ex; \
  touch /opt/app/schema.gql; \
  chown node:node /opt/app/schema.gql;

USER node

# note this gets overridden by docker-compose during local development
CMD ["node", "build/index.js"]
