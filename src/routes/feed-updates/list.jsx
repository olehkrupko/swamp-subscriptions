import { useState, useEffect } from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import FeedUpdatesApi from '../../api/feed-updates';
import FeedUpdatesList from './_list';

  
export default function FeedsList() {
    const LOAD_LESS = 300;
    const LOAD_MORE = 1500;

    const [feedUpdates, setFeedUpdates] = useState([]);
    const [kwargs, setKwargs] = useState({limit: LOAD_LESS});

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

    return (
        <main>
            <h1>Updates</h1>
            <ButtonGroup>
                <Button
                    variant="secondary"
                    onClick={() => {
                        setKwargs({
                            ...kwargs,
                            ...{
                                limit: LOAD_LESS,
                            }
                        });
                    }}
                >
                    Load: LESS
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        setKwargs({
                            ...kwargs,
                            ...{
                                limit: LOAD_MORE,
                            }
                        });
                    }}
                >
                    Load: MORE
                </Button>
            </ButtonGroup>
            {feedUpdates &&
                <FeedUpdatesList
                    feedUpdates={feedUpdates}
                />
            }
        </main>
    );
}
