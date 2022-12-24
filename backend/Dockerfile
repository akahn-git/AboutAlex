# create a new container to perform the build stage
FROM node:14 as build-stage

# set the working directory for the container to "/backend_source"
WORKDIR /backend_source

# copy the project into the build-stage container at "/backend_source"
COPY ./ /backend_source

# run the following commands to install dependencies, build the backend
# these run *inside* the build-stage container
RUN npm install
RUN npm run build

# create a new container based off node:14
FROM node:14

# copy the built backend from the "build-stage" container into the new
# node-based container
COPY --from=build-stage /backend_source/build/ /app

# set the working directory for the container to "/app"
WORKDIR /app

# run the backend server
CMD ["node", "server.js"]
