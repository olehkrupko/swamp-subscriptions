import { useState, useEffect } from 'react';

import FeedUpdatesApi from '../../api/feed-updates';
import FeedUpdatesList from './_list';
import UpdatesFooter from './_list_footer';

  
export default function FeedsList() {
    const LIMIT_DEFAULT = 300;

    const [feedUpdates, setFeedUpdates] = useState([]);
    const [kwargs, setKwargs] = useState({limit: LIMIT_DEFAULT});

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

            <FeedUpdatesList
                feedUpdates={feedUpdates}
            />

            <UpdatesFooter
                kwargs={kwargs}
                setKwargs={setKwargs}
                LIMIT_DEFAULT={LIMIT_DEFAULT}
            />
        </main>
    );
}
