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

import {expect, jest, test} from '@jest/globals';
import { validateTask } from '../../src/validations/taskValidations';
import { AddTaskRequest } from '../../src/models/wsTypes/addTaskRequest';
import { randomUUID } from 'crypto';
import { validateAddTaskRequest, validateAddTaskResponse } from '../../src/validations/wsRequestValidations';
import { AddTaskResponse } from '../../src/models/wsTypes/addTaskResponse';

/* Test Boards */
const UNIT_TEST_BACKEND_WS_ADD_TASK_VALID_REQ_1: AddTaskRequest = {
    requestTimestamp: new Date("2024-05-27T16:35:08.567Z"),
    requestUuid: randomUUID(),
    newTask: {
        id: '',     // Will be ignored by server (exists to match interface definition)
        name: "UNIT_TEST_BACKEND_ADD_TASK_OBJ_1 ",
        abstract: "UNIT_TEST_BACKEND_ADD_TASK_OBJ_1 ABSTRACT",
        description: 
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel ante ullamcorper, fermentum nisl vel, egestas risus. Vivamus imperdiet felis in mauris euismod, pharetra auctor mauris gravida. Donec suscipit massa finibus lacus scelerisque, ut venenatis ligula varius. Nunc sagittis nisi eros, ac mattis nibh elementum quis. Aliquam ipsum arcu, congue at diam vitae, malesuada aliquet risus. Donec lectus turpis, sollicitudin quis eleifend aliquam, rutrum ut nisl. Phasellus tempor molestie vehicula. Mauris sit amet leo aliquam, finibus leo commodo, auctor dolor. Suspendisse potenti. Maecenas ut turpis blandit dolor ultrices scelerisque vel et turpis. Quisque porta a leo sit amet semper. Cras non malesuada lacus. In vestibulum aliquet metus, vel aliquet nibh.
            Vestibulum ac ligula diam. Vestibulum ornare ligula hendrerit nisi condimentum, vitae congue arcu interdum. Donec viverra magna a ipsum hendrerit congue. Sed ornare, arcu quis malesuada euismod, risus massa tristique tellus, sit amet mattis erat diam quis lacus. Nunc non odio sodales, rhoncus magna quis, condimentum libero. Nam vitae est in eros porta ullamcorper ut vel sapien. Maecenas laoreet lorem id sollicitudin egestas. Nulla viverra hendrerit auctor. Vivamus ut lorem tristique, feugiat enim non, consectetur ante. Proin sollicitudin quam ut tellus auctor consectetur.
            Nulla facilisi. Aliquam mattis interdum erat, non vulputate neque finibus dapibus. Suspendisse vitae magna lectus. Etiam ullamcorper, mi vel aliquet ullamcorper, ligula dolor aliquet sem, a ultrices massa velit et velit. Morbi vitae ultricies dolor. Donec felis elit, lobortis eget condimentum non, venenatis quis ex. In a lacus orci.
        `
    }
}

const UNIT_TEST_BACKEND_WS_ADD_TASK_VALID_REQ_2: AddTaskRequest = {
    requestTimestamp: new Date("2024-05-27T16:35:08.567Z"),
    requestUuid: randomUUID(),
    newTask: {
        id: '',     // Will be ignored by server (exists to match interface definition)
        name: "    ",
        priority: 2,
        abstract: "",
        description: 
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel ante ullamcorper, fermentum nisl vel, egestas risus. Vivamus imperdiet felis in mauris euismod, pharetra auctor mauris gravida. Donec suscipit massa finibus lacus scelerisque, ut venenatis ligula varius. Nunc sagittis nisi eros, ac mattis nibh elementum quis. Aliquam ipsum arcu, congue at diam vitae, malesuada aliquet risus. Donec lectus turpis, sollicitudin quis eleifend aliquam, rutrum ut nisl. Phasellus tempor molestie vehicula. Mauris sit amet leo aliquam, finibus leo commodo, auctor dolor. Suspendisse potenti. Maecenas ut turpis blandit dolor ultrices scelerisque vel et turpis. Quisque porta a leo sit amet semper. Cras non malesuada lacus. In vestibulum aliquet metus, vel aliquet nibh.
            Vestibulum ac ligula diam. Vestibulum ornare ligula hendrerit nisi condimentum, vitae congue arcu interdum. Donec viverra magna a ipsum hendrerit congue. Sed ornare, arcu quis malesuada euismod, risus massa tristique tellus, sit amet mattis erat diam quis lacus. Nunc non odio sodales, rhoncus magna quis, condimentum libero. Nam vitae est in eros porta ullamcorper ut vel sapien. Maecenas laoreet lorem id sollicitudin egestas. Nulla viverra hendrerit auctor. Vivamus ut lorem tristique, feugiat enim non, consectetur ante. Proin sollicitudin quam ut tellus auctor consectetur.
            Nulla facilisi. Aliquam mattis interdum erat, non vulputate neque finibus dapibus. Suspendisse vitae magna lectus. Etiam ullamcorper, mi vel aliquet ullamcorper, ligula dolor aliquet sem, a ultrices massa velit et velit. Morbi vitae ultricies dolor. Donec felis elit, lobortis eget condimentum non, venenatis quis ex. In a lacus orci.
        `
    }
}

const UNIT_TEST_BACKEND_WS_ADD_TASK_INVALID_REQ_1: AddTaskRequest = {
    requestTimestamp: new Date("2024-05-27T16:35:08.567Z"),
    requestUuid: randomUUID(),
    newTask: {
        id: '',     // Will be ignored by server (exists to match interface definition)
        name: "    ",
        abstract: "",
        description: 
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel ante ullamcorper, fermentum nisl vel, egestas risus. Vivamus imperdiet felis in mauris euismod, pharetra auctor mauris gravida. Donec suscipit massa finibus lacus scelerisque, ut venenatis ligula varius. Nunc sagittis nisi eros, ac mattis nibh elementum quis. Aliquam ipsum arcu, congue at diam vitae, malesuada aliquet risus. Donec lectus turpis, sollicitudin quis eleifend aliquam, rutrum ut nisl. Phasellus tempor molestie vehicula. Mauris sit amet leo aliquam, finibus leo commodo, auctor dolor. Suspendisse potenti. Maecenas ut turpis blandit dolor ultrices scelerisque vel et turpis. Quisque porta a leo sit amet semper. Cras non malesuada lacus. In vestibulum aliquet metus, vel aliquet nibh.
            Vestibulum ac ligula diam. Vestibulum ornare ligula hendrerit nisi condimentum, vitae congue arcu interdum. Donec viverra magna a ipsum hendrerit congue. Sed ornare, arcu quis malesuada euismod, risus massa tristique tellus, sit amet mattis erat diam quis lacus. Nunc non odio sodales, rhoncus magna quis, condimentum libero. Nam vitae est in eros porta ullamcorper ut vel sapien. Maecenas laoreet lorem id sollicitudin egestas. Nulla viverra hendrerit auctor. Vivamus ut lorem tristique, feugiat enim non, consectetur ante. Proin sollicitudin quam ut tellus auctor consectetur.
            Nulla facilisi. Aliquam mattis interdum erat, non vulputate neque finibus dapibus. Suspendisse vitae magna lectus. Etiam ullamcorper, mi vel aliquet ullamcorper, ligula dolor aliquet sem, a ultrices massa velit et velit. Morbi vitae ultricies dolor. Donec felis elit, lobortis eget condimentum non, venenatis quis ex. In a lacus orci.
        `
    }
}

const UNIT_TEST_BACKEND_WS_ADD_TASK_INVALID_REQ_2: AddTaskRequest = {
    requestTimestamp: new Date("2024-05-27T16:35:08.567Z"),
    requestUuid: randomUUID(),
    newTask: {
        id: '',     // Will be ignored by server (exists to match interface definition)
        name: "    ",
        priority: 5,
        abstract: "",
        description: 
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel ante ullamcorper, fermentum nisl vel, egestas risus. Vivamus imperdiet felis in mauris euismod, pharetra auctor mauris gravida. Donec suscipit massa finibus lacus scelerisque, ut venenatis ligula varius. Nunc sagittis nisi eros, ac mattis nibh elementum quis. Aliquam ipsum arcu, congue at diam vitae, malesuada aliquet risus. Donec lectus turpis, sollicitudin quis eleifend aliquam, rutrum ut nisl. Phasellus tempor molestie vehicula. Mauris sit amet leo aliquam, finibus leo commodo, auctor dolor. Suspendisse potenti. Maecenas ut turpis blandit dolor ultrices scelerisque vel et turpis. Quisque porta a leo sit amet semper. Cras non malesuada lacus. In vestibulum aliquet metus, vel aliquet nibh.
            Vestibulum ac ligula diam. Vestibulum ornare ligula hendrerit nisi condimentum, vitae congue arcu interdum. Donec viverra magna a ipsum hendrerit congue. Sed ornare, arcu quis malesuada euismod, risus massa tristique tellus, sit amet mattis erat diam quis lacus. Nunc non odio sodales, rhoncus magna quis, condimentum libero. Nam vitae est in eros porta ullamcorper ut vel sapien. Maecenas laoreet lorem id sollicitudin egestas. Nulla viverra hendrerit auctor. Vivamus ut lorem tristique, feugiat enim non, consectetur ante. Proin sollicitudin quam ut tellus auctor consectetur.
            Nulla facilisi. Aliquam mattis interdum erat, non vulputate neque finibus dapibus. Suspendisse vitae magna lectus. Etiam ullamcorper, mi vel aliquet ullamcorper, ligula dolor aliquet sem, a ultrices massa velit et velit. Morbi vitae ultricies dolor. Donec felis elit, lobortis eget condimentum non, venenatis quis ex. In a lacus orci.
        `
    }
}

const UNIT_TEST_BACKEND_WS_ADD_TASK_VALID_RESP_1: AddTaskResponse = {
    responseTimestamp: new Date("2024-05-27T16:35:08.567Z"),
    responseUuid: "73adb318-f2c3-4729-8aec-88feca3ca743",
    correlateRequestUuid: "7f4ac8ba-17f5-47eb-8228-2ae0ab8f9440",
    taskId: "100110"
}

const UNIT_TEST_BACKEND_WS_ADD_TASK_INVALID_RESP_1: AddTaskResponse = {
    responseTimestamp: new Date("2024-05-27T16:35:08.567Z"),
    responseUuid: "73adb318-f2c3-4729-8aec-88feca3ca743",
    correlateRequestUuid: "7f4ac8ba-17f5-47eb-8228-2ae0ab8f9440"
}
/* EOF - Test Boards */

describe("Test Task Validator", () => {

    const cases = [
        {
            obj: {
                id: '',
                name: '',
                abstract: ''
            },
            expectedResult: false
        },
        {
            obj: {
                id: '',
                name: '     ',
                abstract: ''
            },
            expectedResult: false
        },
        {
            obj: {
                id: '',
                name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vestibulum sit amet lacus vel convallis. Duis venenatis, nunc nec blan',
                abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vestibulum sit amet lacus vel convallis. Duis venenatis, nunc nec blan'
            },
            expectedResult: false
        },
        {
            obj: {
                id: '',
                name: 'Task Title',
                abstract: `In in hendrerit est, nec bibendum lorem. Cras at tincidunt mauris, quis eleifend lacus. 
                    Sed dui justo, interdum id rhoncus ac, tincidunt nec lorem. Sed nunc leo, bibendum vel erat at, gravida mattis orci.`,
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vestibulum sit amet lacus vel convallis. Duis venenatis, nunc nec blandit laoreet, velit neque elementum magna, eget accumsan neque augue quis massa. Quisque vitae sapien diam. Suspendisse potenti. Maecenas fermentum velit felis, nec sodales quam semper sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque tincidunt eget ipsum vitae gravida.
                    In tempor tempus nibh at aliquam. Mauris vel laoreet enim. Integer odio nulla, blandit id dui quis, euismod consectetur nibh. Sed mattis consectetur sapien non commodo. Vivamus rutrum tincidunt efficitur. Nulla tincidunt, diam vel commodo tristique, turpis justo tristique felis, vitae mattis mauris turpis at ipsum. Pellentesque faucibus lorem vel velit varius, vel viverra augue blandit.
                    Pellentesque tincidunt nunc faucibus vulputate bibendum. Phasellus eget posuere nisi. Etiam dignissim vehicula dignissim. Quisque sed dolor et lectus ullamcorper vestibulum eu id nisl. Duis tempor ultricies turpis, id egestas quam sodales ut. Sed accumsan dui dolor, sit amet cursus lacus cursus at. Pellentesque posuere tortor sit amet lectus tristique imperdiet. Nam vehicula lacus non eleifend vestibulum. Integer mattis felis elit, pellentesque finibus nibh tincidunt vitae. Vivamus varius, diam sed congue tincidunt, turpis eros dapibus velit, eu aliquam sapien nisi eu magna.
                `
            },
            expectedResult: true
        }
    ];

    test.each(cases)('Task Validator Test - Invalid / Valid Task Object', (c) => {

        if (c.expectedResult) {

            expect(
                validateTask(c.obj)
            ).toBeUndefined();

        } else {
    
            expect(() => {
                validateTask(c.obj)
            }).toThrow();

        }

    });

});

describe("Webservice Request Validator", () => {

    describe("Base Request Bodies", () => {

        const cases = [
            {
                obj: UNIT_TEST_BACKEND_WS_ADD_TASK_VALID_REQ_1,
                expectedResult: true
            },
            {
                obj: UNIT_TEST_BACKEND_WS_ADD_TASK_VALID_REQ_1,
                expectedResult: true
            },
            {
                obj: UNIT_TEST_BACKEND_WS_ADD_TASK_INVALID_REQ_1,
                expectedResult: false
            },
            {
                obj: UNIT_TEST_BACKEND_WS_ADD_TASK_INVALID_REQ_2,
                expectedResult: false
            }
        ];

        test.each(cases)('AddTask Request Body Test', (c) => {

            if (c.expectedResult) {
    
                expect(
                    validateAddTaskRequest(c.obj)
                ).toBeUndefined();

            } else {
    
                expect(() => {
                    validateAddTaskRequest(c.obj)
                }).toThrow();
    
            }

        });

    });

    describe("Base Response Bodies", () => {

        const cases = [
            {
                obj: UNIT_TEST_BACKEND_WS_ADD_TASK_VALID_RESP_1,
                expectedResult: true
            },
            {
                obj: UNIT_TEST_BACKEND_WS_ADD_TASK_INVALID_RESP_1,
                expectedResult: false
            }
        ];

        test.each(cases)('AddTask Response Body Test - Created Task ID Response', (c) => {

            if (c.expectedResult) {
    
                expect(
                    validateAddTaskResponse(c.obj)
                ).toBeUndefined();
    
            } else {
    
                expect(() => {
                    validateAddTaskResponse(c.obj)
                }).toThrow();
    
            }

        });

    });

});