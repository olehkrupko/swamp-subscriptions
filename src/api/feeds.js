import { SWAMP_API } from './_settings.js';


export default class FeedsApi {
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

    static async parseFeedHref(href) {
        return fetch(`${SWAMP_API}/feeds/parse/href?href=${href}`, {
            method: 'GET',
        })
            .then(res => res.json())
    }

    static async explainFeedHref(href, _id, mode) {
        let url = `${SWAMP_API}/feeds/parse/explain/?href=${href}`;
        if (_id) {
            url += `&_id=${_id}`;
        }
        // options: 'explain' (default), 'push', 'push_ignore'
        if (mode) {
            mode += `&mode=${mode}`;
        }
        return fetch(url, {method: 'GET'})
            .then(res => res.json())
    }
}
