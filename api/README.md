# TagCon API

> A RESTful API for managing tagged content of video conferences.

## Prerequisite

- [Docker](https://docker.com)
- [Yarn](https://yarnpkg.com)

## Installation

Run `yarn` or `yarn install` to download all dependencies before running the application.

## Available Scripts

In the project directory, you can run:

### `yarn lint`

Runs code linting checks to ensure coe quality and standards.

You can run `yarn lint:js` to validate only JavaScript files.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Run `yarn start:watch` to restart the server on file changes. 

### `yarn test`

Runs unit tests using [Jest](https://jestjs.io)

Run `yarn test:watch` to run Jest when files are saved and updated.

### `yarn container`

Run the container scripts to build and start the application container.

`yarn container:build` builds a container called `tagcon-client-container`.

`yarn container:start` runs the container on port 3000.

`yarn container:dev` runs the container composition as defined in `docker-compose.yml`.

`yarn container:test` runs the container composition for testing as defined in `docker-compose.test.yml`.


