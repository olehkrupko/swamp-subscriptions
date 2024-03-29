import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import FeedsApi from '../../api/feeds';


export default function FeedsList() {
    const navigate = useNavigate();

    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        FeedsApi.getFeeds()
            .then(
                (result) => {
                    console.log('getFeeds() ->', typeof result, result)
                    setFeeds(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                // (error) => {
                //     setError(error);
                // }
            )
    }, [])

    function FeedList(props) {
        return(
            <ListGroup>
                {props.feeds.map((feed) => (
                    <ListGroup.Item>
                        <span
                            onClick={() =>  navigate("/feeds/"+ feed._id)}
                        >
                            {feed.title}
                        </span>
                        <ButtonGroup className="float-end">
                            <Button
                                variant="secondary"
                                href={feed._id}
                                target="_blank"
                            >
                                View
                            </Button>
                            <Button
                                variant="secondary"
                                href={feed._id+'/edit'}
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
            <h1>Feeds</h1>
            <ButtonGroup>
                <Button
                    href='/feeds/create'
                    target="_blank"
                >
                    Create Feed
                </Button>
            </ButtonGroup>
            {feeds &&
                <FeedList
                    feeds={feeds}
                />
            }
        </main>
    );
}
