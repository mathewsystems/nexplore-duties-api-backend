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

import { Task } from '../models/baseClasses';
import { TaskStatus } from '../models/interfaces/taskStatus';
import { GetTaskApiResponse } from '../models/getTaskApiResponse';
import { TaskPriority } from '../models/interfaces/taskPriority';
import { sanitizeStringFields } from '../commons/commonFunctions';
import { Service } from './serviceInterface';

const SYSTEM_USER = 'SYSTEM_USER_001';

const defaultValues = {
    priority: TaskPriority.NORMAL
}

function removeNullFields(obj:any) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj
  }

  
export default class TaskService extends Service {

    public async getTasks():Promise<GetTaskApiResponse | null> {

        const client = await this.dbPool.connect();

        const resCount = await client.query('SELECT COUNT(1) as total_records FROM tasks ');

        const totalRecords: number = Number.parseInt(resCount.rows[0].total_records);

        const resQuery = await client.query('SELECT * FROM tasks ORDER BY posting_date DESC LIMIT 100');

        if (resQuery.rowCount == null || resQuery.rowCount == 0) {
            return null;
        }

        const taskList: Task[] = [];

        // ORM - Field mapping
        resQuery.rows.forEach(r => {

            let t1: Task = {
                id: r.tasks_id,
                name: r.title,
                statusCode: r.status_code,
                priority: r.priority,
                postingDate: r.posting_date,
                deadline: r.deadline,
                abstract: r.abstract,
                description: r.full_description,
                assignedBy: r.assigned_by,
                createdBy: r.create_user
            };

            // Sanitize object
            t1 = removeNullFields(t1);

            taskList.push(t1);

        });
            
        client.release();

        // Response object
        const respObj: GetTaskApiResponse = {
            totalRecords: totalRecords,
            tasks: taskList
        };

        return respObj;

    }

    public async addTask(newTask: Task):Promise<string> {

        if (newTask == null) {

            console.warn('[TaskService][addTask] No task provided.');
            
            return '-500';

        }

        // Sanitize
        newTask = sanitizeStringFields(newTask);

        let client = await this.dbPool.connect();

        let res = await client.query("SELECT nextval('seq_tasks_id') AS tasks_id");

        const taskId: string = res.rows[0].tasks_id;

        // Build query
        const sql = 'INSERT INTO tasks (create_date, posting_date, deadline, tasks_id, status_code, priority, create_user, title, abstract, full_description, assigned_by) VALUES '
            + "(NOW(), NOW(), $1, $2, $3, $4, $5, $6, $7, $8, $9)";

        const sqlValues = [
            newTask.deadline === undefined ? null : newTask.deadline,
            taskId, TaskStatus.UNASSIGNED,
            newTask.priority === undefined ? defaultValues.priority : newTask.priority,
            SYSTEM_USER,
            newTask.name,
            newTask.abstract === undefined ? null : newTask.abstract,
            newTask.description === undefined ? null : newTask.description,
            SYSTEM_USER
        ];

        console.debug(sql);

        try {

            await client.query(sql, sqlValues);

            console.debug('New task added to DB successfully. ID: ' + taskId);
            
        } catch (error) {

            console.error('[TaskService] Error adding new task: ');

            console.error(newTask);

            console.error(error);
            
            return '-500';

        } finally {
            
            client.release();

        }

        return taskId.toString();

    }

    public async deleteTask(taskId: string) {

        console.debug("[TaskService] Delete Task # " + taskId);

        try {

            let res = await this.dbPool.query("DELETE FROM tasks WHERE tasks_id = $1", [taskId]);

            console.debug('Task deleted from DB successfully. ID: ' + taskId);
            
        } catch (error) {

            console.error('[TaskService] Error deleting new task: ' + taskId);

            console.error(error);

        }

    }

}