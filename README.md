# Serverless API - using AWS Node.js Typescript template

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/) and is intended for local testing purposes only, using serverless-offline.


## Installation/deployment instructions

> Using Docker

Exposing the port 3000 is **required**.
- `sudo docker run -p 3000:3000 --rm -it $(sudo docker build -q .)`
- Host will be localhost:3000


> Using npm (NodeJS `lts/fermium (v.14.15.0)`)

- `npm run build`
- `npm start`
- Host will be localhost:3000

## About the lambda

This service contains a single lambda function triggered by an HTTP request made with two routes:

- `/sparkpost` using `POST` method. The request body must be provided as `application/json`. The body structure is tested against `src/functions/sparkpost/schema.ts` JSON-Schema definition: it must contain the `name` and `age` property.

    - sending a `POST` request to `/sparkpost` with a payload **not** containing string properties named `name` nor `age` will return a `400` HTTP error code

    - sending a `POST` request to `/sparkpost` with a payload containing string properties named `name` and `age` will return a `200` HTTP status code and will create a cached entry and will store it for the life of the server.

    - sending a `POST` request to `/sparkpost` with a payload containing string property named `name` holding a value previously sent in other request and `age` property will return a `200` HTTP status code, also updating a previous entry.

- `/sparkpost/{name}` using `GET` method. No request body must be provided, although the `name` pathParameter is required. 

    - sending a `GET` request to `/sparkpost/${name}` containing a previously created name  will return a `200` HTTP status code with the desired object containing name and age.

    - sending a `GET` request to `/sparkpost/${name}` containing a non-created name will return a `404` HTTP status code.

    - sending a `GET` request to `/sparkpost` containing no pathParameters will return a `404` HTTP status code.

- Requesting any other path than `/sparkpost` (POST) or `/sparkpost/{name}` (GET) will return a `404` HTTP error code.

## Testing using Jest

You can run automated tests by starting a local server with `npm run build && npm start` and executing `npm run test` afterwards.

## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
├── README.md                   # Tutorial file
├── __tests__
│   └── handler.test.js         # Jest testing suite
├── babel.config.js             # Babel configuration
├── jest.config.js              # Jest configuration
├── package-lock.json
├── package.json
├── serverless.ts               # Serverless service file
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── index.ts            # Import/export of all lambda configurations
│   │   └── sparkpost           
│   │       ├── handler.ts      # `sparkpost` lambda source code
│   │       ├── index.ts        # `sparkpost` lambda Serverless configuration 
│   │       └── schema.ts       # `sparkpost` lambda input event JSON-Schema for POST
│   └── libs                    # Lambda shared code
│       ├── apiGateway.ts       # API Gateway specific helpers
│       ├── handlerResolver.ts  # Sharable library for resolving lambda handlers
│       └── lambda.ts           # Lambda middleware
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
├── Dockerfile                  # Docker configuration
└── webpack.config.js           # Webpack configuration
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file
- [jest](https://github.com/facebook/jest) - to execute integration tests
- [axios](https://github.com/axios/axios) - to execute HTTP requests during integration tests

