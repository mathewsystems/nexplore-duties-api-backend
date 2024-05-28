# DEVELOPMENT AND BUILD INSTRUCTIONS

## SUMMARY

This API server is served as a HTTP protocol, RESTful-JSON, Typescript, Node.JS based micro-service architecture implementation model.

The server is stateless and highly modularized.

## DEVELOPMENT NOTE

The server is written entirely in TYPE-STRICT Typescript. All objects, procedures, functions are encapsulated at the highest possibility, in an attempt to mimick consistencies with type-safe languages such as Java and C#.

## BUILDING

### PREREQUISITES

```
npm install -g typescript
```

### BUILD

At the source directory containing the package.json file (<project_root>), run

```
npm run build
```

or

```
npx tsc
```

For final runtime distribution, copy the node_modules directory to working directory, i.e. dist/src/ .

Output Directory: <project_root>/dist

#### Directory Layouts

##### Output

dist/src : All compiled runnable JS files and dependencies, entrypoint: index.js

dist/tests : All compiled runnable JS files and dependencies for regression testing.

##### Source Directory

Source Directory: <project_root>/src
Test Codes Directory: <project_root>/tests

###### Directory Summary

-/src/

* commons: Common functions, e.g. object sanitization
* models: Class and function definitions, webservice exchange type definitions, etc.
* models/exceptions: Custom exception types, to mimick type-safe exceptional handling.
* models/interfaces: Interfaces
* models/wsTypes: Webservice data exchange types.
* routes: URL service router modules
* services: Service modules, designed as dependency injectable modules.
* validations: Validator classes

## RUN TESTS

### Test Prerequsites

The Postgres database server must be online and accessible. The test scripts connect to the database server and executes data-correlated integration tests.

For configuration of the database server, refer to README.md file.

```
npm test
```

### Example Test Output

```
npm test

> duties-backend@1.0.0 test
> jest

 PASS  dist/tests/integration/webservices.test.js
  API server tests
    √ API Server root path Simple HTTP test (12 ms)
    Tasks Endpoint Tests
      API Unit Tests
        √ API Server GetTasks - Record Count and Result Match (6 ms)
        √ API Server GetTasks - Invalid HTTP Request Method Test (POST on GET) (3 ms)
        √ API Server AddTask (14 ms)
      Correlation Tests
        √ API Server AddTask - GetTask Correlation (8 ms)
 PASS  dist/tests/unit/validators.test.js
  Test Task Validator
    √ Task Validator Test - Invalid / Valid Task Object (4 ms)
    √ Task Validator Test - Invalid / Valid Task Object (1 ms)
    √ Task Validator Test - Invalid / Valid Task Object
    √ Task Validator Test - Invalid / Valid Task Object
  Webservice Request Validator
    Base Request Bodies
      √ AddTask Request Body Test
      √ AddTask Request Body Test
      √ AddTask Request Body Test
      √ AddTask Request Body Test (1 ms)
    Base Response Bodies
      √ AddTask Response Body Test - Created Task ID Response
      √ AddTask Response Body Test - Created Task ID Response (1 ms)

Test Suites: 2 passed, 2 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        0.547 s, estimated 1 s
Ran all test suites.
```

## DEVELOPMENT GUIDE

The API server is completed modularized to mimick a dependency injection (DI) capable framework. Services and URL routers are separated into service modules.

The API server is designed to be stateless.

Attention: Therefore, DO NOT attempt to store states or files locally in the filesystem.

### ENTRYPOINT

The API server's entry point is index.ts .

The index.ts file does not do any extra work, except of calling the serverConfigSetup to read and initialize configuration files, and eventually, instantiate the ApiServer instance to start listening for new connections.
  
The API Server is designed as an object. Therefore, every instance of the "ApiServer" would create a HTTP server with the same functionality.

Therefore, it is designed to be portable and horizontally scalable in massive deployments.

### Adding New Services

Refer to the task API service template in /src/services/taskService.ts .  

All services must implement the interface "Service" in the /src/services/serviceInterface.ts file.

Use the prototype to build additional services.

### Adding New API URL Routes

Refer to the task API routing template in /src/routes/taskRoute.ts .  

Use the function prototype to build additional URL routes.

Group your routes into separated routing function files.

### Exposing the Routes

Add your routes in the file /src/apiServer.ts , ONLY under the function "addRoutes()". Group the routes within curley brackets.

Example:

```
// New Route
{
      this.app.use("/new_route", newRouter);
}
```

### On Database Record IDs

The API server uses Oracle/Postgres sequences to generate unique IDs for database records, which makes it easy to concatenate with other parts to form a globally unique identifier in the future.

## TEST BOARDS

The test boards are separated into 2 groups: functional unit tests and integration tests.

Directory: <project_dir>/tests