/*
 * Copyright 2024 Mathew Chan. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * @author Mathew Chan
 * @email mathew.chan@mathewsystems.com
 * @web mathewsystems.com
 * @web matcphotos.com
 */

import { expect, test } from '@jest/globals';
import { ApiServer } from '../../src/apiServer';
import { serverConfigSetup } from '../../src/serverConfig';
import request from "supertest";
import { GetTasksResponse } from '../../src/models/wsTypes/getTasksResponse';
import { AddTaskRequest } from '../../src/models/wsTypes/addTaskRequest';
import { Task } from '../../src/models/baseClasses';
import { randomUUID } from 'crypto';
import { AddTaskResponse } from '../../src/models/wsTypes/addTaskResponse';

// Configurations
const HOST = 'http://localhost';
var PORT:Number = 8080;

// Unit Test Objects
const UNIT_TEST_BACKEND_ADD_TASK_OBJ_1: Task = {
    id: '',     // Will be ignored by server (exists to match interface definiation)
    name: "[TEST SUITE] ROMEO AND JULIET",
    abstract: "Me they shall feel while I am able to stand; and'tis known I am a pretty piece of flesh.",
    description: 
    `What, drawn and talk of peace! I hate the word,
        As I hate hell, all Montagues, and thee.
        Have at thee, coward!.
    `
}
// EOF - Unit Test Objects

// Correlation Test Objects
const UNIT_TEST_BACKEND_ADD_TASK_OBJ_CORRELATION_1: Task = {
    id: '',     // Will be ignored by server (exists to match interface definiation)
    name: "[TEST SUITE] WILLIAM SHAKESPEARE",
    abstract: "AS YOU LIKE IT, ACT 2 SCENE 7",
    description: 
    `All the world's a stage /And all the men and women merely players. / They have their exits and their entrances, / And one man in his time plays many parts.
        — AS YOU LIKE IT, ACT 2 SCENE 7`
}
// EOF - Unit Test Objects

describe("API server tests", () => {

    const endpoint = HOST + ':' + PORT.toString();

    // API Server object
    let apiServer: ApiServer;

    test("API Server root path Simple HTTP test", done => {

        request(endpoint)
            .get("/")
            .then(resp => {
                expect(resp.statusCode).toBe(200);
            })
            .finally(() => {
                done();
            });
        
    });

    describe("Tasks Endpoint Tests", () => {

        // API Unit Tests, No historic dependencies
        describe("API Unit Tests", () => {

            test("API Server GetTasks - Record Count and Result Match", done => {

                request(endpoint)
                    .get("/tasks/")
                    .then(resp => {
                        
                        expect(resp.statusCode).toBe(200);

                        const respJson:GetTasksResponse = resp.body;

                        const totalRecords = respJson.totalRecords;

                        const recordsPerPage = respJson.recordsPerPage;

                        const tasks = respJson.tasks;

                        expect(totalRecords).toBeDefined();

                        expect(totalRecords).toBeGreaterThanOrEqual(0);

                        if (totalRecords != null && totalRecords > 0) {

                            expect(tasks?.length).toBeLessThanOrEqual(totalRecords);

                        }

                        expect(tasks?.length).toBe(totalRecords);

                        done();

                    });
                
            });

            test("API Server GetTasks - Invalid HTTP Request Method Test (POST on GET)", done => {

                request(endpoint)
                    .post("/tasks/")
                    .then(resp => {
                        
                        expect(resp.statusCode).toBe(404);

                        done();

                    });
                
            });

            test("API Server AddTask", done => {

                // Test Request Object
                let requestObj:AddTaskRequest = {
                    requestUuid: randomUUID(),
                    requestTimestamp: new Date(),
                    newTask: UNIT_TEST_BACKEND_ADD_TASK_OBJ_1
                }

                request(endpoint)
                    .post("/tasks/add/")
                    .send(requestObj)
                    .then(resp => {
                        
                        expect(resp.statusCode).toBe(200);

                        const respJson:AddTaskResponse = resp.body;

                        // Expect a new TaskID
                        const newTaskIdStr = respJson.taskId;

                        expect(newTaskIdStr).toBeDefined();

                        if (newTaskIdStr != null) {

                            const newTaskId = Number.parseInt(newTaskIdStr);

                            expect(newTaskId).toBeGreaterThan(1);

                        }

                        done();

                    });
                
            });

        });
        // EOF - API Unit Tests, No historic dependencies
        
        // API Integration Test - Correlation Tests - Multiple requests and responses
        describe("Correlation Tests", () => {

            test("API Server AddTask - GetTask Correlation", done => {

                // Add Shakespeare
                let requestObj:AddTaskRequest = {
                    requestUuid: randomUUID(),
                    requestTimestamp: new Date(),
                    newTask: UNIT_TEST_BACKEND_ADD_TASK_OBJ_CORRELATION_1
                }

                let newTaskId: Number;

                request(endpoint)
                    .post("/tasks/add/")
                    .send(requestObj)
                    .then(resp => {
                        
                        expect(resp.statusCode).toBe(200);

                        const respJson:AddTaskResponse = resp.body;

                        // Expect a new TaskID
                        const newTaskIdStr = respJson.taskId;

                        expect(newTaskIdStr).toBeDefined();

                        if (newTaskIdStr != null) {

                            newTaskId = Number.parseInt(newTaskIdStr);

                            expect(newTaskId).toBeGreaterThan(1);

                        }

                    })
                    .then(() => {
                        
                        request(endpoint)
                        .get("/tasks/")
                        .then(resp => {
                            
                            expect(resp.statusCode).toBe(200);

                            const respJson:GetTasksResponse = resp.body;

                            const tasks:Task[] | undefined = respJson.tasks;

                            expect(tasks).toBeDefined();

                            expect(tasks?.length).toBeGreaterThanOrEqual(1);
                            
                            const newTaskIdStr = newTaskId.toString();
                            
                            // Find TaskID
                            let matchedTask:Task | null = null;

                            if (tasks != null && tasks.length > 0) {

                                tasks.forEach(t => {
                                    
                                    if (t.id == newTaskIdStr) {
                                        matchedTask = t;
                                        console.warn('[Good] Matched Task ID ' + t.id);
                                    }

                                });

                                expect(matchedTask).toBeDefined();

                            }

                        })
                        .then(() => {
                            done();
                        });;

                    });
                
            });

        });
        // EOF - API Integration Test - Correlation Tests - Multiple requests and responses

    });
    // EOF - Tasks Endpoint Tests

    /* Setup */

    // Setup API server, do not start, jest will start automatically
    beforeAll(async() => {
            
        const {httpServerPort, dbPoolConfig} = serverConfigSetup();

        PORT = httpServerPort;
        
        // API Server object
        apiServer = new ApiServer(httpServerPort, dbPoolConfig);
    
        // Disable cors during test
        apiServer.enableCors = false;
    
        await apiServer.start();
            
    });
    
    // Shutdown server
    afterAll(async () => {

        await apiServer.stop();

    });
    /* EOF - Setup */

});