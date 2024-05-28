export function sanitizeStringFields(obj:any):any {

    for (let prop in obj) {

        if (obj[prop] != null && typeof(prop) === 'string') {
            obj[prop] = obj[prop].trim();
        }

    }
    
    return obj;

}