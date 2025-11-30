import { useEffect, useState, } from "react";

import { useParams } from "react-router";

import FeedsForm from './FeedsForm';
import Updates from '../updates/Updates';
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
            <FeedForm
                read_only={true}
                feed_id={feed_id}
            />
            {updates &&
                <Updates
                    updates={updates}
                />
            }
        </main>
    );
}
