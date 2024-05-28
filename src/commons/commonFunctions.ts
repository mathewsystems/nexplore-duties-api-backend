export function sanitizeStringFields(obj:any):any {

    for (let prop in obj) {

        if (typeof(prop) === 'string') {
            obj[prop] = obj[prop].trim();
        }

    }
    
    return obj;

}