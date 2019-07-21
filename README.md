# Chalhoub frontend-test
this project is a news SPA with offline support.
This is the client side project, and is pointing to an api that is deployed in https://chalhoubappserver.herokuapp.com/
to point to local api server, read the section  "Running with local api server"

Deployed application url: http://chalhoubnews.herokuapp.com/

## Tech: 

* React
* SCSS
* Css Grid - Flexbox
* Jest
* Webpack
* NodeJS - Express (test server)
* Workbox (Service Worker Generator) - to dinamic caching according to environment.

## Dependencies: 
you need to install nodeJS

## Build

 in order to build this project just run

```
npm start
```

 to only build the application

```
npm run build
```
this will generate a public folder with the project build output.



in order to run this project in development mode

```
npm run start-dev
```

## Test

to test this project run:

```
npm test
```

to check coverage:

```
npm run coverage
```

## Running with local api server

In case you'd like to run this app pointing to local api server: https://github.com/nicolassigal/newspwa_api
you need to change in build script the environment variable to local.

```
"build": "webpack --mode production --config webpack.config/webpack.prod.js --env.local",
```

## Author

Nicolás Emiliano Sigal - 2019