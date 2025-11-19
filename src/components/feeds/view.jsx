import { useEffect, useState, } from "react";
import { useParams, } from "react-router";

import FeedForm from './_form';
import UpdatesApi from '../../api/updates';
import Updates from './../updates/components/Updates';


export default function FeedsView() {
    const params = useParams();
    const feed_id = parseInt(params.feedId, 10);

    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        UpdatesApi.getUpdates({_id: params.feedId})
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
