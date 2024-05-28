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

import { Express, Request, Response, Router } from "express";
import TaskService from "../services/taskService";
import { UUID, randomUUID } from "crypto";
import { GetTasksResponse } from "../models/wsTypes/getTasksResponse";
import { AddTaskResponse } from "../models/wsTypes/addTaskResponse";
import { AddTaskRequest } from "../models/wsTypes/addTaskRequest";
import { validateRequest } from "../validations/wsRequestValidations";
import { validateTask } from "../validations/taskValidations";
import ValidationException from "../models/exceptions/validationException";

export function addTaskRoutes(app:Express, taskService:TaskService):Router {

    let taskRoute = Router();
    
    // API Get Tasks
    app.get("/tasks/?", (req: Request, res: Response) => {

        console.debug(`[${new Date().toISOString()}][API Server][GET][/tasks/]`);

        taskService.getTasks()
        .then(t => {

            const respUuid:UUID = randomUUID();

            // Instantiate response object
            const respJson: GetTasksResponse = {
                responseTimestamp: new Date(),
                responseUuid: respUuid,
                responseCode: 200,
                totalRecords: t?.totalRecords,
                recordsPerPage: 100,
                pageNum: 34,
                tasks: t?.tasks
            };

            res.header("X-API-RESPONSE-UUID", respUuid)
                .send(respJson);

        });
    });

    // API Delete Task
    app.delete("/tasks/:taskId/?", (req: Request, res: Response) => {
        
        const taskId = req.params.taskId.trim();

        const respUuid:UUID = randomUUID();

        // Instantiate response object
        const respJson: AddTaskResponse = {
            responseTimestamp: new Date(),
            responseUuid: respUuid
        };

        if (taskId.length === 0) {

            respJson.responseCode = 400;
            respJson.errors = ["Invalid Task ID"];
            respJson.message = "Invalid Task ID";

            res.header("X-API-RESPONSE-UUID", respUuid)
                .status(400)
                .send(respJson);

            return;

        }

        console.debug(`[${new Date().toISOString()}][WS Request][DeleteTask]: ${taskId}`);

        try {

            taskService.deleteTask(taskId)
                .then(() => {

                    respJson.responseCode = 200;
                    respJson.message = `Task ${taskId} deleted successfully.`

                    res.send(respJson);
                    
                });
            
        } catch (error) {

            console.error(`[${new Date().toISOString()}][apiServer] Service error on deleting task: ${taskId}`);
            
            console.error(error);

            respJson.responseCode = 500;
            respJson.errors = ["Server error. Contact administrator."];
            respJson.message = "Server error. Contact administrator.";

            res.header("X-API-RESPONSE-UUID", respUuid)
                .status(500)
                .send(respJson);

            return;
        
        }

    });

    // API Add Task
    app.post("/tasks/add/?", (req: Request, res: Response) => {

        console.debug(`[${new Date().toISOString()}][WS Request][AddTask]: `);
        console.debug(req.body);

        const reqNewTask:AddTaskRequest = req.body;

        const respUuid:UUID = randomUUID();

        const respJson: AddTaskResponse = {
            responseTimestamp: new Date(),
            responseUuid: respUuid,
            correleateRequestUuid: reqNewTask.requestUuid,
        }

        try {

            validateRequest(reqNewTask);
            
        } catch (error) {

            const ex = error as ValidationException;

            respJson.responseCode = 400;
            respJson.message = "Invalid Request";
            respJson.errors = ex.reasons;
            
            res.header("X-API-RESPONSE-UUID", respUuid)
                .status(400)
                .send(respJson);

            return;
            
        }

        // Request validation
        if (reqNewTask.newTask == null) {

            respJson.responseCode = 400;
            respJson.message = "No Task provided.";
            respJson.errors = ["No Task provided."];

            res.header("X-API-RESPONSE-UUID", respUuid)
                .status(400)
                .send(respJson);

            return;
        
        } else {

            try {
    
                validateTask(reqNewTask.newTask);
                
            } catch (error) {
    
                const ex = error as ValidationException;

                respJson.responseCode = 400;
                respJson.message = "Invalid Request";
                respJson.errors = ex.reasons;
    
                res.header("X-API-RESPONSE-UUID", respUuid)
                    .status(400)
                    .send(respJson);
    
                return;
                
            }
        
        }

        try {

            taskService.addTask(req.body.newTask)
            .then(taskId => {

                respJson.responseCode = 200;
                respJson.message = "Invalid Request";

                respJson.taskId = taskId;
    
                res.header("X-API-RESPONSE-UUID", respUuid)
                    .send(respJson);
                    
                return;

            });
        
        } catch (error) {

            console.error(`[${new Date().toISOString()}][apiServer] Service error on adding new task: `);

            console.error(req);
            
            console.error(error);

            respJson.responseCode = 500;
            respJson.errors = ["Server error. Contact administrator."];
            respJson.message = "Server error. Contact administrator.";

            res.header("X-API-RESPONSE-UUID", respUuid)
                .status(500)
                .send(respJson);

            return;

        }

    });

    return taskRoute;

}