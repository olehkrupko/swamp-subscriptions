import RequestApi from './Request.js';


export default class AuthApi {
    static async requestBearerToken(username, password) {
        return RequestApi.make({
            url: '/auth/login/',
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ username, password }),
            credentials: true
        })
    }

    static async verifyToken() {
        return RequestApi.make({
            url: '/auth/verify/',
            credentials: true
        })
    }
}
