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

import { Task } from "../models/baseClasses";
import ValidationException from "../models/exceptions/validationException";

const fieldLimits = {
    name: 80,
    abstract: 1000,
    description: 3000
};

export function validateTask(task: Task) {

    let valid = true;
    
    let reasons:string[] = [];

    // Task title field
    if (task.name == null || task.name.trim().length === 0 || task.name.length > fieldLimits.name) {
        valid = false;
        reasons.push(`No task name provided, or too long. Max length ${fieldLimits.name}`);
    }

    // Summary field
    if (task.abstract == null || task.abstract.trim().length === 0 || task.abstract.length > fieldLimits.abstract) {
        valid = false;
        reasons.push(`No abstract provided, or too long. Max length ${fieldLimits.abstract}`);
    }

    // Full description field
    if (task.description != null && task.description.trim().length > fieldLimits.description) {
        valid = false;
        reasons.push(`Description too long. Max length ${fieldLimits.description}`);
    }

    if (!valid) {
        throw new ValidationException(reasons);
    }

}
