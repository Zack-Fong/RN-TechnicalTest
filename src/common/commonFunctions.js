
export function isArray(array) {
    return Array.isArray(array);
}

export function isNumberEmpty(number) {
    return (typeof number === "undefined" || number === null || number === '' || isNaN(Number(number)));
}

export function isStringEmpty(string) {
    return (typeof string === 'undefined' || string === null || string.length === 0);
}

export function isArrayEmpty(array) {
    return (typeof array === 'undefined' || !isArray(array) || array === null || array.length === 0);
}

export function isObjectEmpty(object) {
    return (typeof object !== 'object' || object === null || isArray(object) || (Object.entries(object).length === 0 && object.constructor === Object));
}

export function isEqual(element1, element2) {
    return (element1 === element2);
}

export function shadowCopyObject(obj) {
    return Object.assign({}, obj);
}

export function deepCopyObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function validatePhone(phone) {
    let reg = /^(?=.*[0-9])[- ()0-9]+$/;
    return (reg.test(phone));
}

export function validateEmail(email) {
    let reg = /^([A-Za-z0-9_\-\.])+\@(?!(?:[A-Za-z0-9_\-\.]+\.)?([A-Za-z]{2,4})\.\2)([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(email);
}