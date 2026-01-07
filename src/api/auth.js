import { SWAMP_API } from './settings.js';


export default class AuthApi {
    static async requestBearerToken(username, password) {
        return fetch(`${SWAMP_API}/auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ username, password })
        })
    }
}
