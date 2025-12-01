import { useParams } from 'react-router';

import FeedsForm from './FeedsForm';


export default function FeedsEdit() {
    const params = useParams();
    const feed_id = parseInt(params.feedId, 10);

    return (
        <main>
            <h2>Edit Feed</h2>
            <FeedsForm
                feed_id={feed_id}
            />
        </main>
    );
}
