import { useState, useEffect } from 'react'

import ListGroup from 'react-bootstrap/ListGroup';
import FeedUpdatesApi from '../../api/feed-updates';

  
export default function FeedsList() {
    const [feedUpdates, setFeedUpdates] = useState([]);
    const [kwargs, setKwargs] = useState({});

    useEffect(() => {
        FeedUpdatesApi.getFeedUpdates(kwargs)
            .then(
                (result) => {
                    // setIsLoaded(true);
                    console.log(typeof result, result)
                    setFeedUpdates(result);
                },
                // // Note: it's important to handle errors here
                // // instead of a catch() block so that we don't swallow
                // // exceptions from actual bugs in components.
                // (error) => {
                //     setIsLoaded(true);
                //     setError(error);
                // }
            )
    }, [kwargs])

    function openInNewTab(href) {
        window.open(href, '_blank')
            .focus();
    }

    function FeedUpdateList(props) {
        console.log(typeof props.feedUpdates, props.feedUpdates)
        return(
            <ListGroup>
                {props.feedUpdates.map((update) => (
                    <ListGroup.Item>
                        <div
                            style={{
                                cursor: "pointer"
                            }}
                            onClick={() => openInNewTab( update.href )}
                        >
                            <b>{update.name}</b> ({ update.datetime })
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )
    }

    return (
        <main>
            {feedUpdates &&
                <FeedUpdateList
                    feedUpdates={feedUpdates}
                />
            }
        </main>
    );
}