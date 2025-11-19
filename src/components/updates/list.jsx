import { useState, useEffect } from 'react';

import UpdatesApi from '../../api/updates';
import Updates from './components/Updates';
import UpdatesFilter from './components/UpdatesFilter';
import UpdatesFooter from './components/UpdatesFooter';

  
export default function FeedsList() {
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

            { showFilters && <UpdatesFilter
                kwargs={kwargs}
                setKwargs={setKwargs}
            /> }

            <Updates
                updates={updates}
            />

            <UpdatesFooter
                kwargs={kwargs}
                setKwargs={setKwargs}
                LIMIT_DEFAULT={LIMIT_DEFAULT}
            />
        </main>
    );
}
