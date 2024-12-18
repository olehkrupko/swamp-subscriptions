import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

import FeedsApi from '../../api/feeds';


export default function FeedExplain(props) {
    const navigate = useNavigate();
    
    const [similarFeeds, setSimilarFeeds] = useState([]);
    
    const [visible, setVisible] = useState(false);


    const HandleExplainUrl = event => {
        FeedsApi.explainFeedUrl(props.inputFeed['href'], props.inputFeed['readonly_id'])
            .then(
                (result) => {
                    props.setInputFeed({
                        ...props.inputFeed,
                        ...{
                            'title': result.explained.title,
                            'href': result.explained.href,
                            'href_user': result.explained.href_user,
                            'private': result.explained.private,
                            'frequency': props.frequencies.indexOf(result.explained.frequency),
                            'notes': result.explained.notes,
                            'json': JSON.stringify(result.explained.json),
                        }
                    });

                    if (result.similar_feeds.length) {
                        setSimilarFeeds(result.similar_feeds);
                        setVisible(true);
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                // (error) => {
                //     setError(error);
                // }
            )
    }


    const HandleExplainPushUrl = event => {
        FeedsApi.explainFeedUrl(props.inputFeed['href'], props.inputFeed['readonly_id'])
            .then(
                (result) => {
                    if (result.similar_feeds.length) {
                        props.setInputFeed({
                            ...props.inputFeed,
                            ...{
                                'title': result.explained.title,
                                'href': result.explained.href,
                                'href_user': result.explained.href_user,
                                'private': result.explained.private,
                                'frequency': props.frequencies.indexOf(result.explained.frequency),
                                'notes': result.explained.notes,
                                'json': JSON.stringify(result.explained.json),
                            }
                        });
                        
                        setSimilarFeeds(result.similar_feeds);
                        setVisible(true);
                    } else {
                        let data = {
                            title: result.explained.title,
                            href: result.explained.href,
                            href_user: result.explained.href_user,
                            private: result.explained.private,
                            frequency: props.frequencies.indexOf(result.explained.frequency),
                            notes: result.explained.notes,
                            json: JSON.stringify(result.explained.json),
                        }
                
                        FeedsApi.createFeed(data)
                            .then(
                                (result) => {
                                    console.log('createFeed() ->', typeof result, result)
                                    navigate("/feeds/"+ result._id);
                                },
                                // Note: it's important to handle errors here
                                // instead of a catch() block so that we don't swallow
                                // exceptions from actual bugs in components.
                                // (error) => {
                                //     setError(error);
                                // }
                            )
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                // (error) => {
                //     setError(error);
                // }
            )
    }

    const HandleResetFeed = event => {
        setVisible(false);
        window.location.reload();
    }


    const ExplainModal = event => {
        return (
            <Modal
                show={visible}
                onHide={() => setVisible(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Similar feeds detected:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li><b>CURRENT</b></li>
                        <ul>
                            <li>{props.inputFeed['title']}</li>
                            <li style={{ wordWrap: 'break-word' }}>{props.inputFeed['href']}</li>
                            <li>{props.frequencies[props.inputFeed['frequency']]}</li>
                        </ul>
                        {similarFeeds.map(feed => (
                            <li>
                                <a
                                    href={"/feeds/"+feed._id}
                                    title={"href: "+feed.href}
                                >
                                    <b>{feed._id}</b>: {feed.title}
                                </a>
                                <ul>
                                    <li>{feed._created}</li>
                                    { props.inputFeed['title'] !== feed.title &&
                                        <li>{feed.title}</li>
                                    }
                                    { props.inputFeed['href'] !== feed.href &&
                                        <li style={{ wordWrap: 'break-word' }}>{feed.href}</li>
                                    }
                                    { props.frequencies[props.inputFeed['frequency']] !== feed.frequency &&
                                        <li>{feed.frequency}</li>
                                    }
                                </ul>
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button
                            variant="secondary"
                            onClick={() => HandleResetFeed()}
                        >
                            Reset
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => setVisible(false)}
                        >
                            Close
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        )
    }


    return (
        <>
            <Button
                variant="secondary"
                onClick={() => HandleExplainUrl()}
            >
                Explain
            </Button>

            <Button
                variant="secondary"
                onClick={() => HandleExplainPushUrl()}
                disabled={props.feed_id}
            >
                Explain&Push
            </Button>
            
            {ExplainModal()}
        </>
    )
}
