let feeds = [
    {
        id: 1995,
        title: "Santa Monica",
        // href: "http://SantaMonica.com",
    },
    {
        id: 2000,
        title: "Stankonia",
        // href: "http://Stankonia.com",
    },
];

export function getFeeds() {
    return feeds;
}

export function getFeed(id) {
    return feeds.find(
        (feed) => feed._id === id
    );
}
