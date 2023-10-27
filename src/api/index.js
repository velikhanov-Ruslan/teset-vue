export default class Api {
    static get(resource, params, body) {
        return fetch(resource, params, body);
    }
}