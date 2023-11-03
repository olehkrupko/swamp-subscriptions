import { useState, useEffect } from 'react'

import FeedUpdatesApi from '../../api/feed-updates';
import FeedUpdatesList from './_list';

  
export default function FeedsList() {
    const [feedUpdates, setFeedUpdates] = useState([]);
    const [kwargs, setKwargs] = useState({limit: 500});

    useEffect(() => {
        FeedUpdatesApi.getFeedUpdates(kwargs)
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
    }, [kwargs])

    return (
        <main>
            <h1>Updates</h1>
            {feedUpdates &&
                <FeedUpdatesList
                    feedUpdates={feedUpdates}
                />
            }
        </main>
    );
}
