# create a new container to perform the build stage
FROM node:14 as build-stage

# set the working directory for the container to "/backend_source"
WORKDIR /backend_source

# copy the package.json and package-lock.json into the build-stage container
COPY package*.json /backend_source/

# run the following command to install dependencies
# this command runs *inside* the build-stage container
RUN npm install

# copy the rest of the project into the build-stage container
COPY . /backend_source

# create a new container based off node:14
FROM node:14

# copy the node_modules folder and built backend from the "build-stage" container
# into the new node-based container
COPY --from=build-stage /backend_source/node_modules/ /app/node_modules
COPY --from=build-stage /backend_source/ /app

# set the working directory for the container to "/app"
WORKDIR /app

# run the backend server
CMD ["npm", "start"]
