export default class ValidationException extends Error {
    
    reasons?:string[];

    constructor(reasons:string[]) {
        super();
        this.reasons = reasons;
    }

}