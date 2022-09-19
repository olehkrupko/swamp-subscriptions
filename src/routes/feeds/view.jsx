import { useParams } from "react-router-dom";

import FeedForm from './_form';


export default function FeedsView() {
    const params = useParams();
    const feed_id = parseInt(params.feedId, 10);

    return (
        <main>
            <h2>Create Feed</h2>
            <FeedForm
                read_only={true}
                feed_id={feed_id}
            />
        </main>
    );
}