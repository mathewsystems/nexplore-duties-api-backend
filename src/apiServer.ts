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

import express, { Application, Express, Request, Response } from "express";
import TaskService from "./services/taskService";
import { Pool, PoolConfig } from 'pg';
import cors from "cors";
import { Server } from "http";
import { addTaskRoutes } from "./routes/taskRoutes";

/**
 * API server core instance
 */
export class ApiServer {

  private httpServerPort:Number;
  
  private dbPool:Pool;

  public enableCors:boolean = true;

  private server?:Server;

  // Express Server
  private app:Express = express();

  constructor(httpServerPort:Number, dbPoolConfig:PoolConfig) {

    this.httpServerPort = httpServerPort;

    console.warn("Connecting to Database Pool...");

    this.dbPool = new Pool(dbPoolConfig);
  
    console.warn("DB connection pool established.");

  }

  public async setup() {
  
    console.warn("Validating database table structures...");

    await this.validateDb()
      .then(() => {

        console.warn("DB tables verified successfully.");
    
        console.warn("DB connetion pool established successfully.");

        // It's a JSON-only API server
        this.app.use(express.json());
        
        if (this.enableCors) {

          this.app.use(cors());

        }
    
        // Backend Entry point
        this.app.get("/", (req: Request, res: Response) => {
          res.send(`Nexplore Duties Dummy Backend Running on port ${this.httpServerPort}`);
        });
    
        // Additonal Routes
        this.addRoutes();
        
      })
      .catch (_err => {
        throw _err;
      });

  }

 /**
  * DB Tables and Structures Validation
  */
  private async validateDb() {

    if (this.dbPool == null) {
      throw "FATAL: Database pool unavailable.";
    }

    let result = await this.dbPool.query('SELECT COUNT(1) AS rc FROM tasks LIMIT 1');
      
    console.warn('Tasks table record count: ' + result.rows[0].rc);
  
  }

  /**
   * Set up and start server using the correct sequence with DB structure validation.
   */
  public async start() {

    console.warn('Setting up server environment, please wait...');
    
    await this.setup();

    console.warn('Done. Starting server');

    // Start listening on HTTP port
    this.server = this.app.listen(this.httpServerPort, () => {
      console.warn(`\nAPI Server Ready: Nexplore Duties Assignment System Backend app listening on port ${this.httpServerPort}`);
    });

  }

  public async stop() {
    await this.gracefulShutdown();
    this.server?.close();
  }

  private async gracefulShutdown() {

    if (this.dbPool == null) {
      return;
    }
  
    console.warn("Disconnecting from all DB pools...");
  
    await this.dbPool.end();
  
    console.warn("DB Disconnected.");
  
  }

  public getDbPool(): Pool {
    return this.dbPool;
  }

  /**
   * Invoke custom routing functions here. Do not modify API server kernel.
   */
  public addRoutes() {

    // Task Routes
    {

      const taskService = new TaskService(this.dbPool);

      const taskRouter = addTaskRoutes(this.app, taskService);

      this.app.use("/tasks", taskRouter);

    }

    // Add other routes here

  }

}