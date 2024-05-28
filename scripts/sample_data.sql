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
 
 -- SAMPLE DATA IMPORT FOR DEMO PURPOSES
 INSERT INTO public.tasks (tasks_id,create_date,modify_date,posting_date,create_user,modify_user,deadline,status_code,title,abstract,full_description,assigned_by,priority) VALUES
	 (4001,'2024-05-29 00:48:35.883338',NULL,'2024-05-29 00:48:35.883338','SYSTEM_USER_001',NULL,NULL,1001,'[DEMO DATA] ROMEO AND JULIET','Me they shall feel while I am able to stand; and''tis known I am a pretty piece of flesh.','What, drawn and talk of peace! I hate the word,
        As I hate hell, all Montagues, and thee.
        Have at thee, coward!.','SYSTEM_USER_001',1),
	 (4002,'2024-05-29 01:19:34.100217',NULL,'2024-05-29 01:19:34.100217','SYSTEM_USER_001',NULL,NULL,1001,'[DEMO DATA] ROMEO AND JULIET','Me they shall feel while I am able to stand; and''tis known I am a pretty piece of flesh.','What, drawn and talk of peace! I hate the word,
        As I hate hell, all Montagues, and thee.
        Have at thee, coward!.','SYSTEM_USER_001',1),
	 (4003,'2024-05-29 01:19:34.106362',NULL,'2024-05-29 01:19:34.106362','SYSTEM_USER_001',NULL,NULL,1001,'[DEMO DATA] Example Task','Integer lacinia facilisis turpis, consectetur vulputate nisi sodales a. Vivamus dictum turpis in ante eleifend molestie. Curabitur vel auctor diam, semper interdum diam. Vivamus elementum iaculis euismod. Maecenas sed dui vitae purus molestie scelerisque sit amet quis enim. Nunc elit justo, porttitor ut felis ac, mollis posuere turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. In suscipit ac sapien a elementum. Nulla malesuada lacus ut orci hendrerit sodales. Suspendisse ac lobortis nunc. Vestibulum fringilla lectus dapibus diam euismod tincidunt. Suspendisse potenti.','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit odio neque, tristique finibus enim porta ac. Vivamus suscipit dictum leo, mattis imperdiet lacus placerat a. Vivamus vitae consectetur lacus, eu luctus libero. Ut imperdiet est massa, quis pulvinar nisl mollis a. Quisque auctor ipsum urna, eget lacinia massa posuere quis. Morbi purus odio, fermentum non nisl sit amet, tincidunt facilisis eros. Proin nisl diam, consequat non efficitur ut, viverra quis libero. Cras quis iaculis ligula, ac finibus lacus. Praesent in pretium ante, a eleifend leo. Vivamus luctus massa non lectus pellentesque, eget rutrum purus iaculis. Quisque consectetur vel ante sit amet euismod. Suspendisse at tempus turpis. Suspendisse potenti. Aliquam luctus lorem nec felis ultricies, ut suscipit eros dictum. Mauris varius velit nisi, sagittis lacinia arcu ullamcorper dapibus. In varius est eget magna molestie, ac ultrices velit mollis. Phasellus elementum metus augue, ac varius lacus rutrum ac.','SYSTEM_USER_001',1);
