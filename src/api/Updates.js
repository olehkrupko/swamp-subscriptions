import RequestApi from './Request.js';


export default class UpdatesApi {
    static async getUpdates(kwargs) {
        const kwarg_str = Object.entries(kwargs).map(
            ([k, v]) => {
                if (v !== 'all') {
                    return `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;
                }
            }
        ).join('&')

        return RequestApi.make({
            url: `/updates/?${kwarg_str}`
        })
    }

    static async parseHrefUpdates(href) {
        return RequestApi.make({
            url: `/updates/parse/?href=${href}`
        })
    }
}
