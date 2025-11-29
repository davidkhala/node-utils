export const isFloat = (number) => typeof number === 'number' && !Number.isInteger(number);
/**
 *
 * @param {string} str
 * @return {string[]}
 */
export const splitBySpace = (str) => str.trim().split(/\b\s+/);


export function removeUndefinedValues(object, recursive, clone) {
    if (clone) {
        const cloned = {};
        for (const [key, value] of Object.entries(object)) {
            const valueType = typeof value;
            if (value && recursive && valueType === 'object') {
                cloned[key] = removeUndefinedValues(value, recursive, clone);
            } else if (valueType !== 'undefined') {
                cloned[key] = value;
            }
        }
        return cloned;
    }

    for (const [key, value] of Object.entries(object)) {
        const valueType = typeof value;

        if (!value && valueType === 'undefined') {
            delete object[key];
        } else if (recursive && valueType === 'object') {
            object[key] = removeUndefinedValues(value, recursive, clone);
        }

    }
    return object;


}

export const getClassSimpleName = (object) => object.constructor.name;

export function findIndexesOf(str, pattern, from = 0) {
    let index = str.indexOf(pattern, from);
    const result = [];
    while (index !== -1) {
        result.push(index);
        index = str.indexOf(pattern, from + index + 1);
    }
    return result.length ? result : undefined;
}

export function isCommentOnly(str) {

    const commentStart = str.indexOf('/*');
    const commentEnd = str.indexOf('*/', commentStart);
    return commentEnd - commentStart + 2 === str.length;
}

/**
 * @param key
 * @param data
 * @param {boolean} force
 * @param {boolean} [stringOnly]
 */
export function envInject(key, data, {force, stringOnly}) {

    switch (typeof data) {
        case 'bigint':
        case 'boolean':
            if (stringOnly) {
                data = data.toString();
            }
            break;
        case 'number':
        case 'string':
        case 'symbol':
        case 'function':
        case 'undefined':
        case 'object':
            if (stringOnly) {
                data = JSON.stringify(data);
            }
            break;
        default:
            throw Error(`unknown type of data:${typeof data}`);
    }
    if (process.env[key]) {
        if (!force) {
            throw Error(`process.env.${key} already exists`);
        }
    }
    process.env[key] = data;
}

export const ObjectEqual = (object1, object2) => JSON.stringify(object1) === JSON.stringify(object2)

export const JSONEqual = (json1, json2) => ObjectEqual(JSON.parse(json1), JSON.parse(json2))

