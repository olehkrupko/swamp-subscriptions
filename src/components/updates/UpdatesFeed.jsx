import { useState, useEffect } from 'react';

import Updates from './UpdatesFeedList';
import UpdatesFeedFilter from './UpdatesFeedFilter';
import UpdatesFeedFooter from './UpdatesFeedFooter';
import UpdatesApi from '../../api/updates';

  
export default function UpdatesFeed() {
    const LIMIT_DEFAULT = 300;

    const [updates, setUpdates] = useState([]);
    const [kwargs, setKwargs] = useState({limit: LIMIT_DEFAULT});
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        UpdatesApi.getUpdates(kwargs)
            .then(
                (result) => {
                    // console.log(typeof result, result)
                    setUpdates(result);
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

            { showFilters && <UpdatesFeedFilter
                kwargs={kwargs}
                setKwargs={setKwargs}
            /> }

            <Updates
                updates={updates}
            />

            <UpdatesFeedFooter
                kwargs={kwargs}
                setKwargs={setKwargs}
                LIMIT_DEFAULT={LIMIT_DEFAULT}
            />
        </main>
    );
}
