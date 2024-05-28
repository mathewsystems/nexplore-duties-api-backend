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

import { PoolConfig } from "pg";
import dotenv from "dotenv";

const PG_DEFAULTS = {
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'nexplore_duties',
};

// Environment Configurations
dotenv.config();

/**
 * This function only reads defaults and config files for startup purposes.
 */
export function serverConfigSetup() {
    
  let httpServerPort:Number = 80;

  if (process.env.HTTP_SERVER_PORT !== undefined) {
      
      httpServerPort = Number.parseInt(process.env.HTTP_SERVER_PORT);

  }

  // Validate PG settings
  let pgDbPort: number = PG_DEFAULTS.port;

  {

      if (process.env.PG_DB_USER === undefined) {
          throw "Postgres DB user not provided.";
      }

      if (process.env.PG_DB_PORT !== undefined) {
        pgDbPort = Number.parseInt(process.env.PG_DB_PORT);
      }

  }

  const dbPoolConfig: PoolConfig = {
    user: process.env.PG_DB_USER,
    password: process.env.PG_DB_PWD,
    host: process.env.PG_DB_HOST,
    port: pgDbPort,
    database: process.env.PG_DB_NAME,
  };;

  return {httpServerPort, dbPoolConfig};

}