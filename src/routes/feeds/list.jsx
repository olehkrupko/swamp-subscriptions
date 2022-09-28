import { useState, useEffect } from 'react'

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import FeedsApi from '../../api/feeds';

  
export default function FeedsList() {
    const [feeds, setFeeds] = useState('');

    useEffect(() => {
        FeedsApi.getFeeds()
            .then(
                (result) => {
                    // setIsLoaded(true);
                    console.log(typeof result.response, result.response)
                    setFeeds(result.response);
                },
                // // Note: it's important to handle errors here
                // // instead of a catch() block so that we don't swallow
                // // exceptions from actual bugs in components.
                // (error) => {
                //     setIsLoaded(true);
                //     setError(error);
                // }
            )
    }, [])

    function FeedList(props) {
        console.log(typeof props.feeds, props.feeds)
        return(
            <ListGroup>
                {props.feeds.map((feed) => (
                    <ListGroup.Item>
                        {feed.title}
                        <ButtonGroup className="float-end">
                            <Button
                                variant="secondary"
                                href={feed.id}
                                target="_blank"
                            >
                                View
                            </Button>
                            <Button
                                variant="secondary"
                                href={feed.id+'/edit'}
                                target="_blank"
                            >
                                Edit
                            </Button>
                        </ButtonGroup>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )
    }

    return (
        <main>
            <Button
                href='/feeds/create'
                target="_blank"
            >
                Create Feed
            </Button>
            {feeds &&
                <FeedList
                    feeds={feeds}
                />
            }
        </main>
    );
}