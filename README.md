# Ruggable Take Home Test

## Backend

### Getting Started

#### Prerequesites

- Postgres instance running on port 5432 w/ username and password of `postgres`. If you have a different configuration you would like to use, this can be updated in the `ormconfig.json` file.

#### Steps

1. cd into `backend/api`
2. Run `yarn install` to install all the packages.
3. Run `yarn sync:run` to synchronize the database schema
4. To start the API with nodemon watching for changes, run `yarn dev`

### Structure

Inside of the `source` folder you will find three directories:

- `entity` - Home to the entites that are own by this API
- `graphql` - The schema, mutations, queries that describe the functionality
- `resolvers` - Home to the resolvers and providers. In theory, the providers could be written as part of the resolver, but we elect to separate these to maintain clean code.

There is a sample entity called `sample` which should work fully that you can reference.

### Notes:

- During your development process you may need to generate new types from your graphql. To get these to be added to your `@types` run the command `yarn generate`

## Frontend

### Getting Started

#### Steps

1. cd into `client`
2. Run `yarn install` or `npm install` to install all the packages.
3. To start the client, run `yarn start:local` the API endpoints point to `localhost:4004/graphql`
4. Open browser to `localhost:3000`

