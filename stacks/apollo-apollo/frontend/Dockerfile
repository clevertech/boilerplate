FROM node:10.15-alpine
LABEL maintainer="Clevertech DevOps <support@clevertech.biz>"

# Update OS
RUN apk --no-cache add ca-certificates && update-ca-certificates

# Create the working dir
RUN mkdir -p /opt/app && mkdir /cache
WORKDIR /opt/app

# Do not use cache when we change node dependencies in package.json
COPY package.json yarn.lock /cache/

# Copy cache contents (if any) from local machine
ADD .yarn-cache.tgz /

COPY . /opt/app

# Install packages + Prepare cache file
RUN yarn

EXPOSE 3000
CMD ["yarn", "start"]
