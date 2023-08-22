import { SWAMP_API_BASE_URL } from './_settings.js';


const FEEDS_API_ENDPOINTS = {
    FEEDS: `${SWAMP_API_BASE_URL}/feed-updates/`,
}


export default class FeedUpdatesApi {
    static async getFeedUpdates(kwargs) {
        const kwarg_str = Object.entries(kwargs).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
        
        return fetch(FEEDS_API_ENDPOINTS.FEEDS + "?" + kwarg_str, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
    }
}
