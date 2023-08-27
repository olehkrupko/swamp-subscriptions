import { SWAMP_API_BASE_URL } from './_settings.js';


const FEEDS_API_ENDPOINTS = {
    FEED_FREQUENCIES: `${SWAMP_API_BASE_URL}/feeds/frequencies`,
    FEEDS: `${SWAMP_API_BASE_URL}/feeds/`,
}


export default class FeedsApi {
    static async getFrequencies() {
        return fetch(FEEDS_API_ENDPOINTS.FEED_FREQUENCIES)
            .then(res => res.json())
    }

    static async createFeed(data) {
        return fetch(FEEDS_API_ENDPOINTS.FEEDS, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
    }

    static async readFeed(feed_id) {
        return fetch(FEEDS_API_ENDPOINTS.FEEDS+feed_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
    }

    static async updateFeed(feed_id, data) {
        return fetch(FEEDS_API_ENDPOINTS.FEEDS+feed_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
    }

    static async deleteFeed(feed_id) {
        return fetch(FEEDS_API_ENDPOINTS.FEEDS+feed_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
    }

    static async getFeeds() {
        return fetch(FEEDS_API_ENDPOINTS.FEEDS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
    }
}
