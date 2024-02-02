import { SWAMP_API } from './_settings.js';


export default class FeedUpdatesApi {
    static async getFeedUpdates(kwargs) {
        const kwarg_str = Object.entries(kwargs).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
        
        return fetch(`${SWAMP_API}/feed-updates/?${kwarg_str}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
    }
}
