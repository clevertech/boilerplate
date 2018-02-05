FROM node:8-alpine
MAINTAINER Clevertech DevOps <support@clevertech.biz>

# Update OS
RUN apk --no-cache add ca-certificates wget && update-ca-certificates

# Install yarn
RUN mkdir -p /opt/yarn \
  && cd /opt/yarn \
  && wget https://github.com/yarnpkg/yarn/releases/download/v1.3.2/yarn-v1.3.2.tar.gz \
  && tar zxf yarn-v1.3.2.tar.gz \
  && mv yarn-v1.3.2 dist
ENV PATH="/opt/yarn/dist/bin:${PATH}"

COPY . /opt/app

# Do not use cache when we change node dependencies in package.json
ADD package.json yarn.lock /opt/cache/

ADD .yarn-cache.tgz /opt/cache

RUN addgroup lowpriv \
  && adduser -DG lowpriv lowpriv \
  && chown lowpriv:lowpriv -R /opt
USER lowpriv

# Create the working dir
RUN mkdir -p /opt/app
WORKDIR /opt/app

RUN yarn config set prefix /opt/cache/.cache/yarn

# Install packages + Prepare cache file
RUN cd /opt/cache \
  && yarn config set cache-folder /opt/cache/.cache/yarn \
  && yarn \
  && cd /opt/app && ln -s /opt/cache/node_modules node_modules \
  && tar czf /opt/cache/.yarn-cache.tgz /opt/cache/.cache/yarn

RUN yarn install

EXPOSE 3000
CMD ["node", "src/index.js"]
