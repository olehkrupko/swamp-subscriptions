import { useEffect, useState, } from "react";
import { useParams, } from "react-router-dom";

import FeedForm from './_form';
import FeedUpdatesApi from '../../api/feed-updates';
import FeedUpdatesList from './../feed-updates/_list';


export default function FeedsView() {
    const params = useParams();
    const feed_id = parseInt(params.feedId, 10);

    const [feedUpdates, setFeedUpdates] = useState([]);

    useEffect(() => {
        FeedUpdatesApi.getFeedUpdates({feed_id: params.feedId})
            .then(
                (result) => {
                    // console.log(typeof result, result)
                    setFeedUpdates(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                // (error) => {
                //     setError(error);
                // }
            )
    }, [ params.feedId, ])

    return (
        <main>
            <h2>View Feed</h2>
            <FeedForm
                read_only={true}
                feed_id={feed_id}
            />
            {feedUpdates &&
                <FeedUpdatesList
                    feedUpdates={feedUpdates}
                />
            }
        </main>
    );
}
