import { useState, useEffect } from 'react';

import { useSearchParams } from "react-router";

import Updates from './UpdatesFeedList';
import UpdatesFeedFilter from './UpdatesFeedFilter';
import UpdatesFeedFooter from './UpdatesFeedFooter';
import UpdatesApi from '../../api/Updates';

  
export default function UpdatesFeed() {
    const DEFAULT_LIMIT = 300;
    const DEFAULT_KWARGS = {
        limit: DEFAULT_LIMIT,
        private: false,
    }

    const [updates, setUpdates] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    let [kwargs, setKwargs] = useSearchParams(DEFAULT_KWARGS);

    useEffect(() => {
        UpdatesApi.getUpdates(
            Object.fromEntries( kwargs.entries() )
        )
            .then(
                (result) => {
                    // console.log(typeof result, result);
                    setUpdates(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                // (error) => {
                //     setError(error);
                // }
            )
    }, [kwargs]);

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
                DEFAULT_KWARGS={DEFAULT_KWARGS}
            /> }

            <Updates
                updates={updates}
            />

            <UpdatesFeedFooter
                kwargs={kwargs}
                setKwargs={setKwargs}
                DEFAULT_LIMIT={DEFAULT_LIMIT}
            />
        </main>
    );
}
