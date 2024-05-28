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

import ValidationException from "../models/exceptions/validationException";
import { AbstractRequest } from "../models/wsTypes/abstractRequest";
import { AbstractResponse } from "../models/wsTypes/abstractResponse";
import { AddTaskRequest } from "../models/wsTypes/addTaskRequest";
import { AddTaskResponse } from "../models/wsTypes/addTaskResponse";

export function validateRequest(req: AbstractRequest) {

    let valid = true;
    
    let reasons:string[] = [];

    if (req.requestUuid == null) {
        valid = false;
        reasons.push("No requestUUID provided.");
    }

    if (req.requestTimestamp == null) {
        valid = false;
        reasons.push("No requestUUID provided.");
    }

    if (!valid) {
        throw new ValidationException(reasons);
    }

}

export function validateResponse(req: AbstractResponse) {

    let valid = true;
    
    let reasons:string[] = [];

    if (req.responseUuid == null) {
        valid = false;
        reasons.push("No responseUUID provided.");
    }

    if (req.responseTimestamp == null) {
        valid = false;
        reasons.push("No responseTimestamp provided.");
    }

    if (!valid) {
        throw new ValidationException(reasons);
    }

}

export function validateAddTaskRequest(req: AddTaskRequest) {

    let valid = true;

    validateRequest(req);
    
    let reasons:string[] = [];

    if (req.newTask == null) {
        valid = false;
        reasons.push("No newTask provided");
    }

    if (req.newTask?.name == null || req.newTask?.name?.trim().length == 0) {
        valid = false;
        reasons.push("No task name provided");
    }

    if (req.newTask?.priority != null && !(req.newTask?.priority >= 0 && req.newTask?.priority <= 2)) {
        valid = false;
        reasons.push("Invalid priority");
    }

    if (!valid) {
        throw new ValidationException(reasons);
    }

}

export function validateAddTaskResponse(resp: AddTaskResponse) {

    let valid = true;
    
    let reasons:string[] = [];

    validateResponse(resp);

    if (resp.taskId == null) {
        valid = false;
        reasons.push("No Task ID");
    }

    if (!valid) {
        throw new ValidationException(reasons);
    }

}