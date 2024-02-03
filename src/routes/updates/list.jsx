import { useState, useEffect } from 'react';

import FeedUpdatesApi from '../../api/feed-updates';
import Updates from './components/Updates';
import UpdatesFilter from './components/UpdatesFilter';
import UpdatesFooter from './components/UpdatesFooter';

  
export default function FeedsList() {
    const LIMIT_DEFAULT = 300;

    const [feedUpdates, setFeedUpdates] = useState([]);
    const [kwargs, setKwargs] = useState({limit: LIMIT_DEFAULT});
    const [showFilters, setShowFilters] = useState(false);

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
            <h1
                onClick={() => setShowFilters(!showFilters)}
                style={{cursor: 'pointer'}}
            >
                Updates
            </h1>

            { showFilters && <UpdatesFilter
                kwargs={kwargs}
                setKwargs={setKwargs}
            /> }

            <Updates
                updates={feedUpdates}
            />

            <UpdatesFooter
                kwargs={kwargs}
                setKwargs={setKwargs}
                LIMIT_DEFAULT={LIMIT_DEFAULT}
            />
        </main>
    );
}
