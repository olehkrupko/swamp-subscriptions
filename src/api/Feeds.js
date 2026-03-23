import RequestApi from './Request.js';


export default class FeedsApi {
    static async getFeeds() {
        return RequestApi.make({
            url: '/feeds/'
        })
    }

    static async createFeed(data) {
        return RequestApi.make({
            url: '/feeds/',
            method: 'PUT',
            body: JSON.stringify(data),
            credentials: true
        })
    }

    static async readFeed(feed_id) {
        return RequestApi.make({
            url: `/feeds/${feed_id}/`
        })
    }

    static async updateFeed(feed_id, data) {
        return RequestApi.make({
            url: `/feeds/${feed_id}/`,
            method: 'PUT',
            body: JSON.stringify(data),
            credentials: true
        })
    }

    static async deleteFeed(feed_id) {
        return RequestApi.make({
            url: `/feeds/${feed_id}/`,
            method: 'DELETE',
            credentials: true
        })
    }

    static async explainFeedHref(href, _id, mode) {
        let url = `/feeds/parse/?href=${href}`;
        if (_id) {
            url += `&_id=${_id}`;
        }
        // options: 'explain' (default), 'push', 'push_ignore'
        if (mode) {
            url += `&mode=${mode}`;
        }
        return RequestApi.make({
            url: url
        })
    }
}
