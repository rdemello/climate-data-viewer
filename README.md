# React

This template provides a minimal setup to get React working in rsBuild with some ESLint rules and a Prettier config. To start, copy template and run `npm install` to setup included packages.

A .env file is required to point the frontend to the correct backend url either locally or remotely. It should set 'API_ADDRESS' to only the url (no port required).

## Packages of Note

-   Express - to handle the server
-   nodemon - to run the server file with live changes
-   prettier - used to format and clean up code for consistency and legibility
-   react - as it's react
-   react-router-dom - to handle nagivation
-   zustand - to handle state around the app
-   rsbuild - for speed over webpack and using origins micro-frontend
-   swagger - documentation for the backend api

## Commands

| Command      | Script                                                             | Output                                                           |
| ------------ | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| dev          | concurrently \"npm run server:dev\" \"npm run client:dev\"         | Runs a dev environment with live changes when saves are detected |
| client:dev   | rsbuild dev                                                        | Runs the client react app                                        |
| server:dev   | nodemon src/server.cjs                                             | Runs the server file to handle requests                          |
| client:build | rsbuild build                                                      | Builds the react app                                             |
| build        | npm run server:build && npm run client:build                       | Builds the combined package                                      |
| preview      | nodemon server.cjs                                                 | Runs the built app from the dist folder                          |
| test         | prettier --check . && eslint                                       | Runs a check for prettier and eslint                             |
| clean        | prettier --write                                                   | Runs prettier across files based on selected formatting          |
| serve        | node server.cjs                                                    | Runs the server file in isolation                                |
