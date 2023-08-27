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
                    // console.log(typeof result, result)
                    setFeedUpdates(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                // (error) => {
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
                        <a
                            style={{
                                color: 'red',
                                fontWeight: "bold"
                            }}
                        >
                            »
                        </a>
                        &nbsp;
                        <a
                            style={{
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                            onClick={() => openInNewTab( update.href )}
                        >
                            {update.name}
                        </a>
                        &nbsp;(by { update.feed_data.title } on { update.datetime })
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )
    }

    return (
        <main>
            <h1>Updates</h1>
            {feedUpdates &&
                <FeedUpdateList
                    feedUpdates={feedUpdates}
                />
            }
        </main>
    );
}
