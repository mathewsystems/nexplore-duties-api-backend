export function sanitizeStringFields(obj:any):any {

    for (let prop in obj) {

        if (prop != null && obj[prop] != null && typeof obj[prop] === 'string') {
            obj[prop] = obj[prop].trim();
        }

    }
    
    return obj;

}