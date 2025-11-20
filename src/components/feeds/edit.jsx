import { useParams } from "react-router";

import FeedForm from './_form';


export default function FeedEdit() {
    const params = useParams();
    const feed_id = parseInt(params.feedId, 10);

    return (
        <main>
            <h2>Edit Feed</h2>
            <FeedForm
                feed_id={feed_id}
            />
        </main>
    );
}
