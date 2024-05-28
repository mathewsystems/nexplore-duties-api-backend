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
 
-- POSTGRES DATABASE INITIALIZATION SCRIPT

CREATE TABLE tasks (
	tasks_id int4 NOT NULL,
	create_date timestamp NOT NULL,
	modify_date timestamp,
	posting_date timestamp NOT NULL,
	create_user varchar(32),
	modify_user varchar(32),
	deadline timestamp,
	status_code int2 NOT NULL,
	title varchar(96) NOT NULL,
	abstract varchar(1000) NOT NULL,
	full_description varchar(3000),
	assigned_by varchar(96),
	priority int2,
	CONSTRAINT tasks_pkey PRIMARY KEY (tasks_id)
);

CREATE SEQUENCE seq_tasks_id START 100001;