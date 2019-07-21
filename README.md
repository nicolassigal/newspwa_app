# Chalhoub frontend-test
this project is a news SPA with offline support.
This is the client side project, and is pointing to an api that is deployed in https://chalhoubappserver.herokuapp.com/
to point to local api server, read the section  "Running with local api server"

## Tech: 

* React
* SCSS
* Css Grid - Flexbox
* Jest
* Webpack
* NodeJS - Express (test server)

## Dependencies: 
you need to install nodeJS

## Build

 in order to build this project just run

```
npm start
```

in order to run this project in development mode

```
npm run start-dev
```

## Test

to test this project run:

```
npm test
```

to run test with coverage:

```
npm run coverage
```

## Running with local api server

In case you'd like to run this app pointing to local api server: https://github.com/nicolassigal/newspwa_api
you need to change in start-dev script the environment variable to local.

```
"start-dev": "webpack-dev-server --hot --inline --open --mode development --config webpack.config/webpack.dev.js --env.local"
```

## Author

Nicolás Emiliano Sigal - 2019