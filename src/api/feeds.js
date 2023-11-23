import { SWAMP_API } from './_settings.js';


export default class FeedsApi {
    static async getFrequencies() {
        return fetch(`${SWAMP_API}/feeds/frequencies`)
            .then(res => res.json())
    }

    static async getFeeds() {
        return fetch(`${SWAMP_API}/feeds/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
    }

    static async createFeed(data) {
        return fetch(`${SWAMP_API}/feeds/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
    }

    static async readFeed(feed_id) {
        return fetch(`${SWAMP_API}/feeds/${feed_id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
    }

    static async updateFeed(feed_id, data) {
        return fetch(`${SWAMP_API}/feeds/${feed_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
    }

    static async deleteFeed(feed_id) {
        return fetch(`${SWAMP_API}/feeds/${feed_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
    }

    static async testFeedUrl(href) {
        return fetch(`${SWAMP_API}/parse/href?href=${href}`, {
            method: 'GET',
        })
            .then(res => res.json())
    }
}
