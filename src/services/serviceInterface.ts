import { Pool } from 'pg';

export abstract class Service {

    protected dbPool: Pool;

    // Resource Injection
    constructor(dbPool: Pool) {
        this.dbPool = dbPool;
    }

}