import { useEffect, useState, } from 'react';

import { useParams } from 'react-router';

import FeedsForm from './FeedsForm';
import UpdatesFeedList from '../updates/UpdatesFeedList';
import UpdatesApi from '../../api/updates';


export default function FeedsView() {
    const params = useParams();
    const feed_id = parseInt(params.feedId, 10);

    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        UpdatesApi.getUpdates({_id: params.feedId})
            .then(
                (result) => {
                    setUpdates(result);
                },
            )
    }, [ params.feedId, ])

    return (
        <main>
            <h2>View Feed</h2>
            <FeedsForm
                read_only={true}
                feed_id={feed_id}
            />
            {updates &&
                <UpdatesFeedList
                    updates={updates}
                />
            }
        </main>
    );
}
