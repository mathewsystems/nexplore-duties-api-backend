# NEXPLORE DUTIES ASSIGNMENT API SERVER

## ARCHITECTURE SPECIFICATIONS AND SYSTEM REQUIREMENTS

* Language: Typescript-based Node.JS
* Typescript Version: 5.4.5+
* Node.JS runtime environment: >= 18.20.0
* Stateless API Server
* Webservice Type: HTTP-based RESTful JSON, XML and SOAP not supported
* HTTP Protocol Supported: HTTP/1.1 only, no SSL/TLS support.
* Supported Databases: Postgres v16+ only (Should be backward compatible with v12-v15)
* Supported OS: Any with supported Node.JS runtimes (Linux, Unix, Windows, MacOS, etc.)
* Supported Processor Architectures: x86, x86-64, ARM, ARM7, ARM64, PowerPC, System Z

## VERSION HISTORY

* 2024-05-28: v1.0.0pre

## SAMPLE WEBSERVICE REQUESTS AND RESPONSES

### Add a Task Assignment (Duty)

#### Valid Request

##### HTTP Header
```http
POST /tasks/add/ HTTP/1.1
Host: <hostname>
Authorization: Bearer <token>
Content-Type: application/json; charset=utf-8
X-API-OPERATION: /tasks/add/
X-API-SIGNATURE: <signature_hash>
```

##### HTTP Body
```json
{
    "requestTimestamp": "2024-05-26T03:08:54.431Z",
    "requestUuid": "7f4ac8ba-17f5-47eb-8228-2ae0ab8f9440",
    "newTask": {
        "name": "[TEST SUITE] ROMEO AND JULIET",
        "statusCode": 1001,
        "priority": 1,
        "createUser": "SYSTEM_USER_1001",
        "postingDate": "2024-05-26T03:08:54.431Z",
        "deadline": "2024-05-26T03:08:54.431Z",
        "abstract": "Me they shall feel while I am able to stand; and'tis known I am a pretty piece of flesh.",
        "description": "What, drawn and talk of peace! I hate the word, As I hate hell, all Montagues, and thee. Have at thee, coward!."
    }
}
```

#### Response

##### HTTP Header
```http
200 OK
Access-Control-Allow-Origin: <CORS_CONFIG>
Content-Type: application/json; charset=utf-8
X-API-SIGNATURE: <signature_hash>
```

##### HTTP Body
```json
{
    "responseTimestamp": "2024-05-28T01:15:59.133Z",
    "responseUuid": "8adc58eb-9478-44c8-a7f0-c876622b5a49",
    "correleateRequestUuid": "7f4ac8ba-17f5-47eb-8228-2ae0ab8f9440",
    "responseCode": 200,
    "taskId": "100213"
}
```

#### Invalid Request

##### HTTP Header
```http
POST /tasks/add/ HTTP/1.1
Host: <hostname>
Authorization: Bearer <token>
Content-Type: application/json; charset=utf-8
X-API-OPERATION: /tasks/add/
X-PAYLOAD-SIGNATURE: <signature_hash>
```

##### HTTP Body
```json
{
    "requestTimestamp": "2024-05-26T03:08:54.431Z",
    "requestUuid": "7f4ac8ba-17f5-47eb-8228-2ae0ab8f9440",
    "newTask": {
        "name": "   ",
        "abstract": "   ",
        "description": null
    }
}
```

#### Response

##### HTTP Header
```http
400 Bad Request
Access-Control-Allow-Origin: <CORS_CONFIG>
Content-Type: application/json; charset=utf-8
X-PAYLOAD-SIGNATURE: <signature_hash>
```

##### HTTP Body
```json
{
    "responseTimestamp": "2024-05-28T01:24:07.173Z",
    "responseUuid": "50df987a-6972-4590-b6ae-faf1b1d06cb3",
    "correleateRequestUuid": "7f4ac8ba-17f5-47eb-8228-2ae0ab8f9440",
    "errorCode": 400,
    "message": "Invalid Request",
    "errors": [
        "No task name provided, or too long. Max length 80",
        "No abstract provided, or too long. Max length 1000"
    ]
}
```

Note: The API server does not serialize NULL values.  

For detailed explanation of the specifications, see BUILDING.md file.

## RUNTIME CONFIGURATION

### CONFIGURATION FILE

Runtime Configuration File: .env  

The file must co-exist in the same directory as your shell working directory, where the startup command is executed.  

e.g.  

/home/user1/dir1 > /opt/nodejs/v18/bin/node /opt/apiserver/duties-api-backend/v1.0/index.js
  
In this case, the .env file has to be located at /home/user1/dir1

It is recommended that the configuration file be stored in a secure location inaccessible by the webserver, i.e. not accessible through HTTP, such as /var/lib/.

### CONFIGURATION PARAMETERS

#### API SERVER CONFIGURAIONS

##### HTTP LISTEN PORT

Parameter Key: HTTP_SERVER_PORT  
Default: 80

#### DATABASE CONFIGURATIONS

##### Postgres DB Host

Parameter Key: PG_DB_HOST  
Default: localhost

##### Postgres DB Port

Parameter Key: PG_DB_PORT  
Default: 5432

##### Postgres DB User

Parameter Key: PG_DB_USER  
Default: postgres

##### Postgres DB Password

Parameter Key: PG_DB_PWD  
Default: No Default

##### Postgres DB Schema Name

Parameter Key: PG_DB_NAME  
Default: nexplore_duties

## DATABASE INITIALIZATION

In your provisioned database, run the script /scripts/db_init.sql to create the table structures and populate dictionary data.

For demo data, run an additional script at: /scripts/sample_data.sql

Make sure the database user in the configuration file has the following privileges to the schema:

SELECT, UPDATE, INSERT, DELETE

Security Note: It is recommended that the provisioned user has no EXECUTE, CREATE, DROP or any other DDL  privileges.

## START SERVER

cd <project_root_dir>/dist/src/  

node ./index.js  

### Successful Startup Output

```
node ./index.js

Connecting to Database Pool...
DB connection pool established.
Setting up server environment, please wait...
Validating database table structures...
Tasks table record count: 8
DB tables verified successfully.
DB connetion pool established successfully.
Done. Starting server

API Server Ready: Nexplore Duties Assignment System Backend app listening on port 8080
```

### Runtime and Debug Multi-Level Logging

#### Example: Incoming Add Task Request, Console Output
```
[2024-05-28T01:29:44.466Z][WS Request][AddTask]: 
{
  requestTimestamp: '2024-05-26T03:08:54.431Z',
  requestUuid: '7f4ac8ba-17f5-47eb-8228-2ae0ab8f9440',
  newTask: { name: '   ', abstract: '   ', description: null }
}
```

## DEPLOYMENT AND PRODUCTION ENVIRONMENT

### On Linux, single node deployment

#### Startup Options

* systemd script
* init script

### Container-based Deployment

* Docker, using Dockerfile, using ENTRYPOINT script to start node ./index.js
* Kubernetes, with auto-scaling docker pods and ingress fail-overs.

### CLOUD-NATIVE, SERVERLESS DEPLOYMENT

* Cloud native serverless deployment is also possible on AWS Lambda, on Lambda Node.JS Runtimes.

### PRODUCTION CONSIDERATIONS

The Node.JS "express" web server is not supposed to be directly accessed. It is HIGHLY RECOMMENDED to sit behind a web reverse proxy for security and performance considerations.

The reverse web proxy server should fulfill the following tasks:  

* Traffic throttling and connection security filtering
* HTTP protocol handling
* SSL/TLS termination, encryption acceleration
* Static files serving
* On-the-fly compression and decompression
* MIME types handling
* HTTP protocol filtering, rewriting
* URL path rewriting and redirection
* High-availability: Multi-node heartbeat monitoring of the backend API servers

## AUTHOR AND COPYRIGHT

* Author: Mathew Chan
* Web and Contact: matcphotos.com

## LICENSE, USAGE AND DISTRIBUTION

This software is covered under the Apache License 2.0.  

Refer to license file, LICENSE.md  

## DISCLAIMER

The software is provided as-is, with neither support nor warranty. The author is not responsible for any consequences due to the usage of the software. Use at your own risk.

## DEVELOPMENT

Refer to BUILDING.md file.